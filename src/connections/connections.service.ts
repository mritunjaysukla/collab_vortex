import { Injectable, NotFoundException, ForbiddenException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection, ConnectionInitiator, ConnectionStatus } from './entities/connection.entity';
import {
  CreateConnectionDto,
  UpdateConnectionDto,
  ConnectionRecommendationDto,
  RecommendedCreatorCardDto,
  RecommendedBrandCardDto,
} from './dto/connection.dto';
import { CreatorProfileService } from '../creator-profile/creator-profile.service';
import { BrandProfileService } from '../brand-profile/brand-profile.service';
import { UserRole } from '../common/enums';

@Injectable()
export class ConnectionsService {
  constructor(
    @InjectRepository(Connection)
    private readonly connectionRepository: Repository<Connection>,
    private readonly creatorProfileService: CreatorProfileService,
    private readonly brandProfileService: BrandProfileService,
  ) { }

  async create(userId: string, userRole: UserRole, createConnectionDto: CreateConnectionDto): Promise<Connection> {
    // Determine if creator or brand is initiating
    let creatorProfile = null;
    let brandProfile = null;
    let initiator: ConnectionInitiator;

    if (userRole === UserRole.CREATOR) {
      // Creator initiating connection to brand
      creatorProfile = await this.creatorProfileService.findByUserId(userId);
      if (!creatorProfile) {
        throw new ForbiddenException('Creator profile required to connect with brands');
      }

      brandProfile = await this.brandProfileService.findOne(createConnectionDto.targetProfileId);
      initiator = ConnectionInitiator.CREATOR;
    } else if (userRole === UserRole.BRAND) {
      // Brand initiating connection to creator
      brandProfile = await this.brandProfileService.findByUserId(userId);
      if (!brandProfile) {
        throw new ForbiddenException('Brand profile required to connect with creators');
      }

      creatorProfile = await this.creatorProfileService.findOne(createConnectionDto.targetProfileId);
      initiator = ConnectionInitiator.BRAND;
    } else {
      throw new ForbiddenException('Invalid user role for creating connections');
    }

    // Check if connection already exists
    const existingConnection = await this.connectionRepository.findOne({
      where: {
        creatorProfile: { id: creatorProfile.id },
        brandProfile: { id: brandProfile.id },
      },
    });

    if (existingConnection) {
      throw new ConflictException('Connection already exists between these profiles');
    }

    // Create new connection
    const connection = this.connectionRepository.create({
      creatorProfile,
      brandProfile,
      initiator,
      message: createConnectionDto.message,
      status: ConnectionStatus.PENDING,
    });

    return await this.connectionRepository.save(connection);
  }

  async findAll(userId: string, userRole: UserRole): Promise<Connection[]> {
    if (userRole === UserRole.CREATOR) {
      const creatorProfile = await this.creatorProfileService.findByUserId(userId);
      if (!creatorProfile) return [];

      return await this.connectionRepository.find({
        where: { creatorProfile: { id: creatorProfile.id } },
      });
    } else if (userRole === UserRole.BRAND) {
      const brandProfile = await this.brandProfileService.findByUserId(userId);
      if (!brandProfile) return [];

      return await this.connectionRepository.find({
        where: { brandProfile: { id: brandProfile.id } },
      });
    }

    return [];
  }

  async findPending(userId: string, userRole: UserRole): Promise<Connection[]> {
    const connections = await this.findAll(userId, userRole);
    return connections.filter(
      conn => conn.status === ConnectionStatus.PENDING &&
        // Only return connections where current user is the recipient
        ((userRole === UserRole.CREATOR && conn.initiator === ConnectionInitiator.BRAND) ||
          (userRole === UserRole.BRAND && conn.initiator === ConnectionInitiator.CREATOR))
    );
  }

  async findOne(id: string): Promise<Connection> {
    const connection = await this.connectionRepository.findOne({
      where: { id },
    });

    if (!connection) {
      throw new NotFoundException(`Connection with ID ${id} not found`);
    }

    return connection;
  }

  async update(id: string, userId: string, userRole: UserRole, updateConnectionDto: UpdateConnectionDto): Promise<Connection> {
    const connection = await this.findOne(id);

    // Verify user has permission to update this connection
    if (userRole === UserRole.CREATOR) {
      const creatorProfile = await this.creatorProfileService.findByUserId(userId);
      if (!creatorProfile || connection.creatorProfile.id !== creatorProfile.id) {
        throw new ForbiddenException('You do not have permission to update this connection');
      }

      // Creators can only accept/reject if the brand initiated
      if (connection.initiator !== ConnectionInitiator.BRAND) {
        throw new ForbiddenException('You cannot accept/reject a connection you initiated');
      }
    } else if (userRole === UserRole.BRAND) {
      const brandProfile = await this.brandProfileService.findByUserId(userId);
      if (!brandProfile || connection.brandProfile.id !== brandProfile.id) {
        throw new ForbiddenException('You do not have permission to update this connection');
      }

      // Brands can only accept/reject if the creator initiated
      if (connection.initiator !== ConnectionInitiator.CREATOR) {
        throw new ForbiddenException('You cannot accept/reject a connection you initiated');
      }
    }

    // Only allow updating status and message
    connection.status = updateConnectionDto.status;
    if (updateConnectionDto.message) {
      connection.message = updateConnectionDto.message;
    }

    return await this.connectionRepository.save(connection);
  }

  async getRecommendations(userId: string, userRole: UserRole, filters?: ConnectionRecommendationDto): Promise<any[]> {
    if (userRole === UserRole.CREATOR) {
      // Creator looking for brands
      const creatorProfile = await this.creatorProfileService.findByUserId(userId);
      if (!creatorProfile) return [];

      // Get creator's niches
      const creatorNiches = creatorProfile.niches || [];

      // Find brands in related industries
      let brands = [];

      if (filters?.industry) {
        // Filter by specific industry if provided
        brands = await this.brandProfileService.findByIndustry(filters.industry);
      } else if (creatorNiches.length > 0) {
        // Use creator's niches to find relevant brands
        // This is a simplification - ideally you'd have a mapping between niches and industries
        const relevantIndustries = this.mapNichesToIndustries(creatorNiches);

        // Combine results from all relevant industries
        for (const industry of relevantIndustries) {
          const industryBrands = await this.brandProfileService.findByIndustry(industry);
          brands = [...brands, ...industryBrands];
        }
      } else {
        // Fall back to verified brands if no niches/filters
        brands = await this.brandProfileService.findVerifiedBrands();
      }

      // Filter out brands that already have connections with this creator
      const existingConnections = await this.connectionRepository.find({
        where: { creatorProfile: { id: creatorProfile.id } },
      });

      const connectedBrandIds = existingConnections.map(conn => conn.brandProfile.id);

      return brands.filter(brand => !connectedBrandIds.includes(brand.id));
    } else if (userRole === UserRole.BRAND) {
      // Brand looking for creators
      const brandProfile = await this.brandProfileService.findByUserId(userId);
      if (!brandProfile) return [];

      // Find creators by niches
      let creators = [];

      if (filters?.niches && filters.niches.length > 0) {
        // Filter by specific niches if provided
        creators = await this.creatorProfileService.findByNiches(filters.niches);
      } else {
        // Fall back to verified creators
        creators = await this.creatorProfileService.findVerifiedCreators();
      }

      // Filter out creators that already have connections with this brand
      const existingConnections = await this.connectionRepository.find({
        where: { brandProfile: { id: brandProfile.id } },
      });

      const connectedCreatorIds = existingConnections.map(conn => conn.creatorProfile.id);

      return creators.filter(creator => !connectedCreatorIds.includes(creator.id));
    }

    return [];
  }

  async getRecommendedCreatorsForBrand(userId: string): Promise<RecommendedCreatorCardDto[]> {
    const brandProfile = await this.brandProfileService.findByUserId(userId);
    if (!brandProfile) return [];

    // Get creator recommendations (reuse existing logic)
    const creators = await this.getRecommendations(userId, UserRole.BRAND);

    if (creators.length === 0) return [];

    // Extract creator IDs for batch query
    const creatorIds = creators.map(creator => creator.id);

    // Batch query to get connection stats for all creators at once
    const connectionStats = await this.connectionRepository
      .createQueryBuilder('connection')
      .select('connection.creatorProfileId', 'creatorId')
      .addSelect('connection.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('connection.creatorProfileId IN (:...creatorIds)', { creatorIds })
      .groupBy('connection.creatorProfileId, connection.status')
      .getRawMany();

    // Transform stats into a map for quick lookup
    const statsMap = new Map<string, { activeCount: number; pastCount: number }>();

    creatorIds.forEach(id => {
      statsMap.set(id, { activeCount: 0, pastCount: 0 });
    });

    connectionStats.forEach(stat => {
      const creatorId = stat.creatorId;
      const count = parseInt(stat.count);

      if (stat.status === ConnectionStatus.ACCEPTED) {
        statsMap.get(creatorId)!.activeCount = count;
      } else {
        statsMap.get(creatorId)!.pastCount += count;
      }
    });

    // Map creators to DTOs with connection stats
    return creators.map(creator => {
      const stats = statsMap.get(creator.id) || { activeCount: 0, pastCount: 0 };

      return {
        id: creator.id,
        name: creator.user?.email?.split('@')[0] || 'Creator', // Use email prefix as name if no specific name field
        avatar: creator.profileImage || null,
        niches: creator.niches || [],
        activeCount: stats.activeCount,
        pastCount: stats.pastCount,
      };
    });
  }

  async getRecommendedBrandsForCreator(userId: string): Promise<RecommendedBrandCardDto[]> {
    const creatorProfile = await this.creatorProfileService.findByUserId(userId);
    if (!creatorProfile) return [];

    // Get brand recommendations (reuse existing logic)
    const brands = await this.getRecommendations(userId, UserRole.CREATOR);

    if (brands.length === 0) return [];

    // Extract brand IDs for batch query
    const brandIds = brands.map(brand => brand.id);

    // Batch query to get connection stats for all brands at once
    const connectionStats = await this.connectionRepository
      .createQueryBuilder('connection')
      .select('connection.brandProfileId', 'brandId')
      .addSelect('connection.status', 'status')
      .addSelect('COUNT(*)', 'count')
      .where('connection.brandProfileId IN (:...brandIds)', { brandIds })
      .groupBy('connection.brandProfileId, connection.status')
      .getRawMany();

    // Transform stats into a map for quick lookup
    const statsMap = new Map<string, { activeCount: number; pastCount: number }>();

    brandIds.forEach(id => {
      statsMap.set(id, { activeCount: 0, pastCount: 0 });
    });

    connectionStats.forEach(stat => {
      const brandId = stat.brandId;
      const count = parseInt(stat.count);

      if (stat.status === ConnectionStatus.ACCEPTED) {
        statsMap.get(brandId)!.activeCount = count;
      } else {
        statsMap.get(brandId)!.pastCount += count;
      }
    });

    // Map brands to DTOs with connection stats
    return brands.map(brand => {
      const stats = statsMap.get(brand.id) || { activeCount: 0, pastCount: 0 };

      return {
        id: brand.id,
        name: brand.companyName,
        avatar: brand.logoUrl || null,
        industry: brand.industry || 'Not specified',
        activeCount: stats.activeCount,
        pastCount: stats.pastCount,
      };
    });
  }

  // Helper method to map creator niches to relevant brand industries
  // This is a simplified approach - in a real implementation, you might have a more sophisticated mapping
  private mapNichesToIndustries(niches: string[]): string[] {
    const nicheToIndustryMap = {
      'fashion': ['Fashion & Apparel', 'Luxury Goods', 'Retail'],
      'beauty': ['Beauty & Cosmetics', 'Personal Care'],
      'lifestyle': ['Lifestyle', 'Home & Garden', 'Health & Wellness'],
      'fitness': ['Health & Wellness', 'Sports & Fitness'],
      'travel': ['Travel & Hospitality', 'Tourism'],
      'food': ['Food & Beverage', 'Restaurants', 'Grocery'],
      'technology': ['Technology', 'Electronics', 'Software'],
      'gaming': ['Gaming', 'Entertainment'],
      'business': ['Business Services', 'Finance', 'Professional Services'],
      'music': ['Music', 'Entertainment', 'Media'],
      'art': ['Art', 'Design', 'Culture'],
      'education': ['Education', 'E-Learning', 'Training'],
      'pets': ['Pet Care', 'Pet Products', 'Animal Services'],
      'automotive': ['Automotive', 'Transportation'],
      'sports': ['Sports & Fitness', 'Athletics', 'Outdoor Recreation'],
      'photography': ['Photography', 'Media', 'Visual Arts'],
      'parenting': ['Parenting', 'Baby Products', 'Family Services'],
      'sustainability': ['Eco-Friendly', 'Environmental Services', 'Green Products'],
      'finance': ['Finance', 'Banking', 'Investment'],
      'healthcare': ['Healthcare', 'Medical Services', 'Wellness'],
      // Add more mappings as needed
    };

    const industries = new Set<string>();

    niches.forEach(niche => {
      const nicheKey = niche.toLowerCase();
      if (nicheToIndustryMap[nicheKey]) {
        nicheToIndustryMap[nicheKey].forEach(industry => industries.add(industry));
      }
    });

    return Array.from(industries);
  }
}


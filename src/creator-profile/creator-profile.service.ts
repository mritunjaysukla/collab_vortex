import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { CreatorProfile } from './entities/creator-profile.entity';
import {
  CreateCreatorProfileDto,
  UpdateCreatorProfileDto,
  CreatorProfileResponseDto,
  CreatorProfileQueryDto,
  CreatorProfileStatsDto,
  CreatorNiche,
  SocialPlatform,
} from './dto/creator-profile.dto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { FileUploadService } from '../common/services/file-upload.service'; // ADD THIS IMPORT
import { ProposalStatus } from '../common/enums';

@Injectable()
export class CreatorProfileService {
  private readonly logger = new Logger(CreatorProfileService.name);

  constructor(
    @InjectRepository(CreatorProfile)
    private readonly creatorProfileRepository: Repository<CreatorProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly usersService: UsersService,
    private readonly fileUploadService: FileUploadService, // ADD THIS INJECTION
  ) { }

  async create(
    userId: string,
    createCreatorProfileDto: CreateCreatorProfileDto,
  ): Promise<CreatorProfileResponseDto> {
    try {
      this.logger.log(`Creating creator profile for user: ${userId}`);

      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      const existingProfile = await this.creatorProfileRepository.findOne({
        where: { user: { id: userId } },
      });

      if (existingProfile) {
        throw new ConflictException('Creator profile already exists for this user');
      }

      const cleanedData = this.validateAndCleanData(createCreatorProfileDto);

      const creatorProfile = this.creatorProfileRepository.create({
        ...cleanedData,
        user,
        totalCollaborations: 0,
        isAvailable: true,
        isVerified: true, // Auto-verify for now
      });

      const savedProfile = await this.creatorProfileRepository.save(creatorProfile);

      // Update user status to active and profile complete - THIS WAS MISSING
      await this.usersService.updateProfileStatus(userId);

      const profileEntity = Array.isArray(savedProfile) ? savedProfile[0] : savedProfile;
      this.logger.log(`Creator profile created successfully with ID: ${profileEntity.id}`);
      return this.mapToResponseDto(profileEntity);
    } catch (error) {
      this.logger.error(`Error creating creator profile: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof ConflictException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to create creator profile');
    }
  }

  async findAll(queryDto?: CreatorProfileQueryDto): Promise<CreatorProfileResponseDto[]> {
    try {
      this.logger.log('Fetching all creator profiles');

      const queryBuilder = this.createQueryBuilder();

      if (queryDto) {
        this.applyFilters(queryBuilder, queryDto);
        this.applySorting(queryBuilder, queryDto);
        this.applyPagination(queryBuilder, queryDto);
      }

      const profiles = await queryBuilder.getMany();

      this.logger.log(`Found ${profiles.length} creator profiles`);
      return profiles.map(profile => this.mapToResponseDto(profile));
    } catch (error) {
      this.logger.error(`Error fetching creator profiles: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch creator profiles');
    }
  }

  async findVerifiedCreators(): Promise<CreatorProfileResponseDto[]> {
    try {
      this.logger.log('Fetching verified creator profiles');

      const profiles = await this.creatorProfileRepository.find({
        where: { isVerified: true },
        relations: ['user'],
        order: { createdAt: 'DESC' },
      });

      return profiles.map(profile => this.mapToResponseDto(profile));
    } catch (error) {
      this.logger.error(`Error fetching verified creators: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch verified creators');
    }
  }

  async findOne(id: string): Promise<CreatorProfileResponseDto> {
    try {
      this.logger.log(`Fetching creator profile with ID: ${id}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { id },
        relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile with ID ${id} not found`);
      }

      return this.mapToResponseDto(profile);
    } catch (error) {
      this.logger.error(`Error fetching creator profile: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch creator profile');
    }
  }

  async findByUserId(userId: string): Promise<CreatorProfileResponseDto> {
    try {
      this.logger.log(`Fetching creator profile for user: ${userId}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile not found for user ${userId}`);
      }

      return this.mapToResponseDto(profile);
    } catch (error) {
      this.logger.error(`Error fetching creator profile by user ID: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch creator profile');
    }
  }

  async findEntityByUserId(userId: string): Promise<CreatorProfile> {
    try {
      this.logger.log(`Fetching creator profile entity for user: ${userId}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { user: { id: userId } },
        relations: ['user'],
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile not found for user ${userId}`);
      }

      return profile;
    } catch (error) {
      this.logger.error(`Error fetching creator profile entity: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch creator profile entity');
    }
  }

  async update(
    id: string,
    updateCreatorProfileDto: UpdateCreatorProfileDto,
  ): Promise<CreatorProfileResponseDto> {
    try {
      this.logger.log(`Updating creator profile with ID: ${id}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile with ID ${id} not found`);
      }

      const cleanedData = this.validateAndCleanData(updateCreatorProfileDto);

      Object.assign(profile, cleanedData);

      const updatedProfile = await this.creatorProfileRepository.save(profile);

      this.logger.log(`Creator profile updated successfully with ID: ${id}`);
      return this.mapToResponseDto(updatedProfile);
    } catch (error) {
      this.logger.error(`Error updating creator profile: ${error.message}`, error.stack);
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update creator profile');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      this.logger.log(`Deleting creator profile with ID: ${id}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { id },
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile with ID ${id} not found`);
      }

      await this.creatorProfileRepository.remove(profile);

      this.logger.log(`Creator profile deleted successfully with ID: ${id}`);
    } catch (error) {
      this.logger.error(`Error deleting creator profile: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to delete creator profile');
    }
  }

  async getStatistics(id: string): Promise<CreatorProfileStatsDto> {
    try {
      this.logger.log(`Fetching statistics for creator profile: ${id}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { id },
        relations: ['proposals', 'analytics'],
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile with ID ${id} not found`);
      }

      const acceptedProposals = profile.proposals?.filter(p => p.status === ProposalStatus.ACCEPTED).length || 0;

      const totalFollowers = profile.platformStats?.reduce((sum, stat) => sum + stat.followers, 0) || 0;

      const avgEngagementRate = profile.platformStats?.length
        ? profile.platformStats.reduce((sum, stat) => sum + stat.engagementRate, 0) / profile.platformStats.length
        : 0;

      const stats: CreatorProfileStatsDto = {
        totalCollaborations: profile.totalCollaborations || 0,
        totalReviews: acceptedProposals,
        averageRating: Number(profile.averageRating) || 0,
        totalFollowers,
        averageEngagementRate: Number(avgEngagementRate.toFixed(2)),
        completedProjects: acceptedProposals,
        lastActiveAt: profile.updatedAt,
      };

      return stats;
    } catch (error) {
      this.logger.error(`Error fetching creator statistics: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to fetch creator statistics');
    }
  }

  async searchCreators(
    searchTerm: string,
    queryDto?: CreatorProfileQueryDto,
  ): Promise<CreatorProfileResponseDto[]> {
    try {
      this.logger.log(`Searching creators with term: ${searchTerm}`);

      const queryBuilder = this.createQueryBuilder();

      queryBuilder.andWhere(
        '(profile.name ILIKE :searchTerm OR profile.bio ILIKE :searchTerm OR profile.location ILIKE :searchTerm OR :searchTerm = ANY(profile.niches))',
        { searchTerm: `%${searchTerm}%` }
      );

      if (queryDto) {
        this.applyFilters(queryBuilder, queryDto);
        this.applySorting(queryBuilder, queryDto);
        this.applyPagination(queryBuilder, queryDto);
      }

      const profiles = await queryBuilder.getMany();

      this.logger.log(`Found ${profiles.length} creators matching search term`);
      return profiles.map(profile => this.mapToResponseDto(profile));
    } catch (error) {
      this.logger.error(`Error searching creators: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to search creators');
    }
  }

  async findByNiche(niche: string): Promise<CreatorProfileResponseDto[]> {
    try {
      this.logger.log(`Fetching creators by niche: ${niche}`);

      const profiles = await this.creatorProfileRepository.find({
        where: { niches: niche as any },
        relations: ['user'],
        order: { averageRating: 'DESC' },
      });

      return profiles.map(profile => this.mapToResponseDto(profile));
    } catch (error) {
      this.logger.error(`Error fetching creators by niche: ${error.message}`, error.stack);
      throw new InternalServerErrorException('Failed to fetch creators by niche');
    }
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<CreatorProfileResponseDto> {
    try {
      this.logger.log(`Updating availability for creator profile: ${id}`);

      const profile = await this.creatorProfileRepository.findOne({
        where: { id },
        relations: ['user'],
      });

      if (!profile) {
        throw new NotFoundException(`Creator profile with ID ${id} not found`);
      }

      profile.isAvailable = isAvailable;
      const updatedProfile = await this.creatorProfileRepository.save(profile);

      this.logger.log(`Availability updated for creator profile: ${id}`);
      return this.mapToResponseDto(updatedProfile);
    } catch (error) {
      this.logger.error(`Error updating availability: ${error.message}`, error.stack);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to update availability');
    }
  }

  private validateAndCleanData(dto: any): any {
    // Implement validation and cleaning logic here
    return dto;
  }

  private createQueryBuilder(): SelectQueryBuilder<CreatorProfile> {
    return this.creatorProfileRepository.createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .leftJoinAndSelect('profile.proposals', 'proposals')
      .leftJoinAndSelect('profile.platformIntegrations', 'platformIntegrations')
      .leftJoinAndSelect('profile.analytics', 'analytics');
  }

  private applyFilters(queryBuilder: SelectQueryBuilder<CreatorProfile>, queryDto: CreatorProfileQueryDto) {
    // Implement filtering logic based on queryDto
  }

  private applySorting(queryBuilder: SelectQueryBuilder<CreatorProfile>, queryDto: CreatorProfileQueryDto) {
    // Implement sorting logic based on queryDto
  }

  private applyPagination(queryBuilder: SelectQueryBuilder<CreatorProfile>, queryDto: CreatorProfileQueryDto) {
    // Implement pagination logic based on queryDto
  }

  private mapToResponseDto(profile: CreatorProfile): CreatorProfileResponseDto {
    // Generate image URLs
    const imageUrls = this.fileUploadService.getImageUrls(
      profile.profileImageFilename,
      'creator-profiles'
    );

    return {
      id: profile.id,
      name: profile.name,
      bio: profile.bio,
      profileImageFilename: profile.profileImageFilename,
      profileImageMimetype: profile.profileImageMimetype,
      profileImageSize: profile.profileImageSize,

      // NEW: Direct image URLs
      profileImageUrl: this.fileUploadService.getFileUrl(
        profile.profileImageFilename,
        'creator-profiles'
      ),
      profileImageUrls: imageUrls, // Multiple sizes
      profileImageCdnUrl: this.fileUploadService.getCdnUrl(
        profile.profileImageFilename,
        'creator-profiles'
      ),

      platformStats: (profile.platformStats || []).map(stat => ({
        platform: stat.platform as SocialPlatform,
        followers: stat.followers,
        engagementRate: stat.engagementRate,
        avgViews: stat.avgViews,
      })),
      isVerified: profile.isVerified,
      niches: profile.niches || [],
      location: profile.location,
      website: profile.website,
      mediaKit: profile.mediaKit,
      baseRate: profile.baseRate,
      portfolioUrl: profile.portfolioUrl,
      socialLinks: profile.socialLinks || {},
      isAvailable: profile.isAvailable,
      averageRating: profile.averageRating,
      totalCollaborations: profile.totalCollaborations,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
      user: profile.user ? {
        id: profile.user.id,
        email: profile.user.email,
        role: profile.user.role,
      } : undefined,
    };
  }
}

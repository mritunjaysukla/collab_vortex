import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { BrandProfileService } from '../brand-profile/brand-profile.service';
import { Platform } from '../common/enums';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(Campaign)
    private readonly campaignRepository: Repository<Campaign>,
    private readonly brandProfileService: BrandProfileService,
  ) { }

  async create(
    userId: string,
    createCampaignDto: CreateCampaignDto,
  ): Promise<Campaign> {
    const brandProfile = await this.brandProfileService.findByUserId(userId);
    if (!brandProfile) {
      throw new ForbiddenException('Brand profile required to create campaigns');
    }

    const campaign = this.campaignRepository.create({
      ...createCampaignDto,
      startDate: new Date(createCampaignDto.startDate),
      endDate: new Date(createCampaignDto.endDate),
      brandProfile,
    });

    return await this.campaignRepository.save(campaign);
  }

  async findAll(): Promise<Campaign[]> {
    return await this.campaignRepository.find({
      relations: ['brandProfile', 'proposals', 'collaborations'],
      where: { isActive: true },
    });
  }

  async findOne(id: string): Promise<Campaign> {
    const campaign = await this.campaignRepository.findOne({
      where: { id },
      relations: ['brandProfile', 'proposals', 'collaborations'],
    });

    if (!campaign) {
      throw new NotFoundException(`Campaign with ID ${id} not found`);
    }

    return campaign;
  }

  async findByBrandProfile(brandProfileId: string): Promise<Campaign[]> {
    return await this.campaignRepository.find({
      where: { brandProfile: { id: brandProfileId } },
      relations: ['proposals', 'collaborations'],
    });
  }

  async findByUserId(userId: string): Promise<Campaign[]> {
    const brandProfile = await this.brandProfileService.findByUserId(userId);
    if (!brandProfile) {
      return [];
    }
    return await this.findByBrandProfile(brandProfile.id);
  }

  async update(
    id: string,
    updateCampaignDto: UpdateCampaignDto,
  ): Promise<Campaign> {
    const campaign = await this.findOne(id);

    const updateData = { ...updateCampaignDto };
    if (updateCampaignDto.startDate) {
      updateData.startDate = new Date(updateCampaignDto.startDate) as any;
    }
    if (updateCampaignDto.endDate) {
      updateData.endDate = new Date(updateCampaignDto.endDate) as any;
    }

    Object.assign(campaign, updateData);
    return await this.campaignRepository.save(campaign);
  }

  async remove(id: string): Promise<void> {
    const campaign = await this.findOne(id);
    await this.campaignRepository.remove(campaign);
  }

  async findFeatured(): Promise<Campaign[]> {
    return await this.campaignRepository.find({
      where: { isFeatured: true, isActive: true },
      relations: ['brandProfile'],
    });
  }

  async findByPlatform(platform: Platform): Promise<Campaign[]> {
    return await this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
      .where(':platform = ANY(campaign.platforms)', { platform })
      .andWhere('campaign.isActive = :isActive', { isActive: true })
      .getMany();
  }

  async searchCampaigns(filters: {
    budget?: { min?: number; max?: number };
    platforms?: Platform[];
    niches?: string[];
  }): Promise<Campaign[]> {
    const query = this.campaignRepository
      .createQueryBuilder('campaign')
      .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
      .where('campaign.isActive = :isActive', { isActive: true });

    if (filters.budget?.min) {
      query.andWhere('campaign.budget >= :minBudget', { minBudget: filters.budget.min });
    }

    if (filters.budget?.max) {
      query.andWhere('campaign.budget <= :maxBudget', { maxBudget: filters.budget.max });
    }

    if (filters.platforms?.length) {
      query.andWhere('campaign.platforms && :platforms', { platforms: filters.platforms });
    }

    if (filters.niches?.length) {
      query.andWhere('campaign.requirements->>\'niches\' && :niches', { niches: filters.niches });
    }

    return await query.getMany();
  }
}

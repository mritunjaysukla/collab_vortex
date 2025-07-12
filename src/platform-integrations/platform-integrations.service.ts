import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlatformIntegration } from './entities/platform-integration.entity';
import { CreatePlatformIntegrationDto, UpdatePlatformIntegrationDto } from './dto/platform-integration.dto';
import { Platform } from '../common/enums';

@Injectable()
export class PlatformIntegrationService {
  constructor(
    @InjectRepository(PlatformIntegration)
    private readonly platformIntegrationRepository: Repository<PlatformIntegration>,
  ) { }

  async create(creatorProfileId: string, createPlatformIntegrationDto: CreatePlatformIntegrationDto): Promise<PlatformIntegration> {
    // Check if integration already exists for this platform
    const existingIntegration = await this.platformIntegrationRepository.findOne({
      where: {
        creatorProfile: { id: creatorProfileId },
        platform: createPlatformIntegrationDto.platform,
      },
    });

    if (existingIntegration) {
      throw new BadRequestException(`Integration for ${createPlatformIntegrationDto.platform} already exists`);
    }

    const integration = this.platformIntegrationRepository.create({
      ...createPlatformIntegrationDto,
      creatorProfile: { id: creatorProfileId } as any,
      syncStatus: 'disconnected',
    });

    return await this.platformIntegrationRepository.save(integration);
  }

  async findAll(): Promise<PlatformIntegration[]> {
    return await this.platformIntegrationRepository.find({
      relations: ['creatorProfile'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCreatorProfile(creatorProfileId: string): Promise<PlatformIntegration[]> {
    return await this.platformIntegrationRepository.find({
      where: { creatorProfile: { id: creatorProfileId } },
      order: { platform: 'ASC' },
    });
  }

  async findByPlatform(platform: Platform): Promise<PlatformIntegration[]> {
    return await this.platformIntegrationRepository.find({
      where: { platform },
      relations: ['creatorProfile'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PlatformIntegration> {
    const integration = await this.platformIntegrationRepository.findOne({
      where: { id },
      relations: ['creatorProfile'],
    });

    if (!integration) {
      throw new NotFoundException(`Platform integration with ID ${id} not found`);
    }

    return integration;
  }

  async update(id: string, updatePlatformIntegrationDto: UpdatePlatformIntegrationDto): Promise<PlatformIntegration> {
    const integration = await this.findOne(id);
    Object.assign(integration, updatePlatformIntegrationDto);
    return await this.platformIntegrationRepository.save(integration);
  }

  async remove(id: string): Promise<void> {
    const integration = await this.findOne(id);
    await this.platformIntegrationRepository.remove(integration);
  }

  async connect(id: string, authData: { authToken: string; refreshToken?: string; platformUserId: string; platformUsername: string }): Promise<PlatformIntegration> {
    const integration = await this.findOne(id);

    integration.authToken = authData.authToken;
    integration.refreshToken = authData.refreshToken;
    integration.platformUserId = authData.platformUserId;
    integration.platformUsername = authData.platformUsername;
    integration.syncStatus = 'connected';
    integration.tokenExpiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000); // 60 days

    return await this.platformIntegrationRepository.save(integration);
  }

  async disconnect(id: string): Promise<PlatformIntegration> {
    const integration = await this.findOne(id);

    integration.authToken = null;
    integration.refreshToken = null;
    integration.platformUserId = null;
    integration.platformUsername = null;
    integration.syncStatus = 'disconnected';
    integration.tokenExpiresAt = null;
    integration.platformData = null;

    return await this.platformIntegrationRepository.save(integration);
  }

  async syncPlatformData(id: string): Promise<PlatformIntegration> {
    const integration = await this.findOne(id);

    if (integration.syncStatus !== 'connected' || !integration.authToken) {
      throw new BadRequestException('Platform integration is not connected');
    }

    try {
      integration.syncStatus = 'syncing';
      await this.platformIntegrationRepository.save(integration);

      // Simulate platform data sync (in real implementation, call actual APIs)
      const syncedData = await this.fetchPlatformData(integration);

      integration.platformData = syncedData;
      integration.lastSyncAt = new Date();
      integration.syncStatus = 'connected';
      integration.errorMessage = null;

      return await this.platformIntegrationRepository.save(integration);
    } catch (error) {
      integration.syncStatus = 'error';
      integration.errorMessage = error.message;
      await this.platformIntegrationRepository.save(integration);
      throw error;
    }
  }

  private async fetchPlatformData(integration: PlatformIntegration): Promise<any> {
    // Simulate API call to platform
    // In real implementation, this would call Instagram API, TikTok API, etc.
    const platformData = {
      profileUrl: `https://${integration.platform}.com/${integration.platformUsername}`,
      followerCount: Math.floor(Math.random() * 100000) + 1000,
      followingCount: Math.floor(Math.random() * 1000) + 100,
      postCount: Math.floor(Math.random() * 500) + 50,
      engagementRate: (Math.random() * 10 + 1).toFixed(2),
      bio: `${integration.platform} content creator`,
      isVerified: Math.random() > 0.8,
      avgLikes: Math.floor(Math.random() * 10000) + 100,
      avgComments: Math.floor(Math.random() * 500) + 10,
      topHashtags: ['#content', '#creator', '#lifestyle'],
    };

    return platformData;
  }

  async getIntegrationStats(creatorProfileId: string): Promise<any> {
    const integrations = await this.findByCreatorProfile(creatorProfileId);

    const stats = {
      totalIntegrations: integrations.length,
      connectedIntegrations: integrations.filter(i => i.syncStatus === 'connected').length,
      disconnectedIntegrations: integrations.filter(i => i.syncStatus === 'disconnected').length,
      errorIntegrations: integrations.filter(i => i.syncStatus === 'error').length,
      platforms: integrations.map(i => i.platform),
      totalFollowers: integrations.reduce((sum, i) => sum + (i.platformData?.followerCount || 0), 0),
      averageEngagement: integrations.reduce((sum, i) => sum + parseFloat(i.platformData?.engagementRate || '0'), 0) / integrations.length || 0,
    };

    return stats;
  }
}

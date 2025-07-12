import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatorAnalytics } from './entities/creator-analytics.entity';
import { CampaignAnalytics } from './entities/campaign-analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(CreatorAnalytics)
    private readonly creatorAnalyticsRepository: Repository<CreatorAnalytics>,
    @InjectRepository(CampaignAnalytics)
    private readonly campaignAnalyticsRepository: Repository<CampaignAnalytics>,
  ) { }

  // Creator Analytics
  async getCreatorAnalytics(creatorProfileId: string, startDate?: Date, endDate?: Date) {
    const query = this.creatorAnalyticsRepository
      .createQueryBuilder('analytics')
      .where('analytics.creatorProfileId = :creatorProfileId', { creatorProfileId });

    if (startDate) {
      query.andWhere('analytics.date >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('analytics.date <= :endDate', { endDate });
    }

    return await query.orderBy('analytics.date', 'DESC').getMany();
  }

  async getCreatorPerformanceOverview(creatorProfileId: string) {
    const analytics = await this.getCreatorAnalytics(creatorProfileId);

    if (!analytics.length) {
      return {
        totalFollowers: 0,
        averageEngagement: 0,
        totalReach: 0,
        totalViews: 0,
        platforms: 0,
      };
    }

    const latest = analytics[0];
    const platforms = [...new Set(analytics.map(a => a.platform))];

    return {
      totalFollowers: latest.followers,
      averageEngagement: analytics.reduce((sum, a) => sum + Number(a.engagementRate), 0) / analytics.length,
      totalReach: analytics.reduce((sum, a) => sum + a.reach, 0),
      totalViews: analytics.reduce((sum, a) => sum + a.views, 0),
      platforms: platforms.length,
    };
  }

  // Campaign Analytics
  async getCampaignAnalytics(campaignId: string, startDate?: Date, endDate?: Date) {
    const query = this.campaignAnalyticsRepository
      .createQueryBuilder('analytics')
      .where('analytics.campaignId = :campaignId', { campaignId });

    if (startDate) {
      query.andWhere('analytics.date >= :startDate', { startDate });
    }
    if (endDate) {
      query.andWhere('analytics.date <= :endDate', { endDate });
    }

    return await query.orderBy('analytics.date', 'DESC').getMany();
  }

  async getCampaignPerformanceOverview(campaignId: string) {
    const analytics = await this.getCampaignAnalytics(campaignId);

    if (!analytics.length) {
      return {
        totalImpressions: 0,
        totalReach: 0,
        totalEngagement: 0,
        totalClicks: 0,
        totalConversions: 0,
        totalCost: 0,
        averageCPM: 0,
        averageCPC: 0,
        averageROI: 0,
      };
    }

    return {
      totalImpressions: analytics.reduce((sum, a) => sum + a.impressions, 0),
      totalReach: analytics.reduce((sum, a) => sum + a.reach, 0),
      totalEngagement: analytics.reduce((sum, a) => sum + a.engagement, 0),
      totalClicks: analytics.reduce((sum, a) => sum + a.clicks, 0),
      totalConversions: analytics.reduce((sum, a) => sum + a.conversions, 0),
      totalCost: analytics.reduce((sum, a) => sum + Number(a.cost), 0),
      averageCPM: analytics.reduce((sum, a) => sum + Number(a.cpm), 0) / analytics.length,
      averageCPC: analytics.reduce((sum, a) => sum + Number(a.cpc), 0) / analytics.length,
      averageROI: analytics.reduce((sum, a) => sum + Number(a.roi), 0) / analytics.length,
    };
  }
}

import { Repository } from 'typeorm';
import { CreatorAnalytics } from './entities/creator-analytics.entity';
import { CampaignAnalytics } from './entities/campaign-analytics.entity';
export declare class AnalyticsService {
    private readonly creatorAnalyticsRepository;
    private readonly campaignAnalyticsRepository;
    constructor(creatorAnalyticsRepository: Repository<CreatorAnalytics>, campaignAnalyticsRepository: Repository<CampaignAnalytics>);
    getCreatorAnalytics(creatorProfileId: string, startDate?: Date, endDate?: Date): Promise<CreatorAnalytics[]>;
    getCreatorPerformanceOverview(creatorProfileId: string): Promise<{
        totalFollowers: number;
        averageEngagement: number;
        totalReach: number;
        totalViews: number;
        platforms: number;
    }>;
    getCampaignAnalytics(campaignId: string, startDate?: Date, endDate?: Date): Promise<CampaignAnalytics[]>;
    getCampaignPerformanceOverview(campaignId: string): Promise<{
        totalImpressions: number;
        totalReach: number;
        totalEngagement: number;
        totalClicks: number;
        totalConversions: number;
        totalCost: number;
        averageCPM: number;
        averageCPC: number;
        averageROI: number;
    }>;
}

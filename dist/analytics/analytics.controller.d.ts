import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    getCreatorAnalytics(creatorProfileId: string, startDate?: string, endDate?: string): Promise<import("./entities/creator-analytics.entity").CreatorAnalytics[]>;
    getCreatorOverview(creatorProfileId: string): Promise<{
        totalFollowers: number;
        averageEngagement: number;
        totalReach: number;
        totalViews: number;
        platforms: number;
    }>;
    getCampaignAnalytics(campaignId: string, startDate?: string, endDate?: string): Promise<import("./entities/campaign-analytics.entity").CampaignAnalytics[]>;
    getCampaignOverview(campaignId: string): Promise<{
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

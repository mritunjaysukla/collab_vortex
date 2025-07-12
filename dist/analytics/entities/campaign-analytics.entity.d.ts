import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Platform } from '../../common/enums';
export declare class CampaignAnalytics {
    id: string;
    campaign: Campaign;
    platform: Platform;
    date: Date;
    impressions: number;
    reach: number;
    engagement: number;
    clicks: number;
    conversions: number;
    cost: number;
    cpm: number;
    cpc: number;
    cpa: number;
    roi: number;
    createdAt: Date;
    updatedAt: Date;
}

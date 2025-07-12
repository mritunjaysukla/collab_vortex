import { User } from '../../users/entities/user.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { PlatformIntegration } from '../../platform-integrations/entities/platform-integration.entity';
import { CreatorAnalytics } from '../../analytics/entities/creator-analytics.entity';
export declare class CreatorProfile {
    id: string;
    user: User;
    bio: string;
    profileImage: string;
    platformStats: {
        platform: string;
        followers: number;
        engagementRate: number;
        avgViews: number;
    }[];
    isVerified: boolean;
    niches: string[];
    location: string;
    website: string;
    mediaKit: string;
    baseRate: number;
    createdAt: Date;
    updatedAt: Date;
    proposals: Proposal[];
    platformIntegrations: PlatformIntegration[];
    analytics: CreatorAnalytics[];
}

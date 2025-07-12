import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { Platform } from '../../common/enums';
export declare class CreatorAnalytics {
    id: string;
    creatorProfile: CreatorProfile;
    platform: Platform;
    date: Date;
    followers: number;
    engagementRate: number;
    reach: number;
    views: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    demographicData: {
        ageGroups: {
            [key: string]: number;
        };
        genderDistribution: {
            [key: string]: number;
        };
        topLocations: string[];
        interests: string[];
    };
    createdAt: Date;
    updatedAt: Date;
}

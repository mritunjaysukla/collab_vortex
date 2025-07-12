import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { Platform } from '../../common/enums';
export declare class PlatformIntegration {
    id: string;
    creatorProfile: CreatorProfile;
    platform: Platform;
    authToken: string;
    refreshToken: string;
    tokenExpiresAt: Date;
    syncStatus: string;
    lastSyncAt: Date;
    platformUserId: string;
    platformUsername: string;
    platformData: {
        profileUrl?: string;
        followerCount?: number;
        isVerified?: boolean;
        bio?: string;
        [key: string]: any;
    };
    errorMessage: string;
    createdAt: Date;
    updatedAt: Date;
}

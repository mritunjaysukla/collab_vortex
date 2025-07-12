declare class PlatformStatsDto {
    platform: string;
    followers: number;
    engagementRate: number;
    avgViews: number;
}
export declare class CreateCreatorProfileDto {
    bio?: string;
    profileImage?: string;
    platformStats?: PlatformStatsDto[];
    niches?: string[];
    location?: string;
    website?: string;
    mediaKit?: string;
    baseRate?: number;
}
export declare class UpdateCreatorProfileDto {
    bio?: string;
    profileImage?: string;
    platformStats?: PlatformStatsDto[];
    isVerified?: boolean;
    niches?: string[];
    location?: string;
    website?: string;
    mediaKit?: string;
    baseRate?: number;
}
export declare class CreatorProfileResponseDto {
    id: string;
    bio: string;
    profileImage: string;
    platformStats: PlatformStatsDto[];
    isVerified: boolean;
    niches: string[];
    location: string;
    website: string;
    mediaKit: string;
    baseRate: number;
    createdAt: Date;
    updatedAt: Date;
}
export {};

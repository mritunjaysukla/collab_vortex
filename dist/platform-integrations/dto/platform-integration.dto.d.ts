import { Platform } from '../../common/enums';
export declare class CreatePlatformIntegrationDto {
    platform: Platform;
    platformUsername?: string;
}
declare const UpdatePlatformIntegrationDto_base: import("@nestjs/common").Type<Partial<CreatePlatformIntegrationDto>>;
export declare class UpdatePlatformIntegrationDto extends UpdatePlatformIntegrationDto_base {
    syncStatus?: string;
    platformUserId?: string;
    platformUsername?: string;
    platformData?: any;
    errorMessage?: string;
}
export declare class ConnectPlatformDto {
    authToken: string;
    refreshToken?: string;
    platformUserId: string;
    platformUsername: string;
}
export declare class PlatformIntegrationResponseDto {
    id: string;
    platform: Platform;
    syncStatus: string;
    lastSyncAt: Date | null;
    platformUsername: string | null;
    platformUserId: string | null;
    platformData: any | null;
    errorMessage: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PlatformStatsDto {
    totalIntegrations: number;
    connectedIntegrations: number;
    disconnectedIntegrations: number;
    errorIntegrations: number;
    platforms: Platform[];
    totalFollowers: number;
    averageEngagement: number;
}
export {};

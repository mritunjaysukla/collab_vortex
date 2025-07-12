import { Platform } from '../../common/enums';
declare class CampaignRequirementsDto {
    minFollowers?: number;
    minEngagementRate?: number;
    ageRange?: string;
    location?: string[];
    niches?: string[];
}
export declare class CreateCampaignDto {
    title: string;
    description: string;
    budget: number;
    targetAudience: string[];
    startDate: string;
    endDate: string;
    platforms: Platform[];
    deliverables: string[];
    requirements?: CampaignRequirementsDto;
    isActive?: boolean;
    isFeatured?: boolean;
}
export declare class UpdateCampaignDto {
    title?: string;
    description?: string;
    budget?: number;
    targetAudience?: string[];
    startDate?: string;
    endDate?: string;
    platforms?: Platform[];
    deliverables?: string[];
    requirements?: CampaignRequirementsDto;
    isActive?: boolean;
    isFeatured?: boolean;
}
export declare class CampaignResponseDto {
    id: string;
    title: string;
    description: string;
    budget: number;
    targetAudience: string[];
    startDate: Date;
    endDate: Date;
    platforms: Platform[];
    deliverables: string[];
    requirements: CampaignRequirementsDto;
    isActive: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
}
export {};

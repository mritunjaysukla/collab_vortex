export declare class CreateBrandProfileDto {
    companyName: string;
    industry?: string;
    logoUrl?: string;
    teamSize?: string;
    description?: string;
    website?: string;
    location?: string;
    targetAudience?: string[];
    monthlyBudget?: number;
}
export declare class UpdateBrandProfileDto {
    companyName?: string;
    industry?: string;
    logoUrl?: string;
    verified?: boolean;
    teamSize?: string;
    description?: string;
    website?: string;
    location?: string;
    targetAudience?: string[];
    monthlyBudget?: number;
}
export declare class BrandProfileResponseDto {
    id: string;
    companyName: string;
    industry: string;
    logoUrl: string;
    verified: boolean;
    teamSize: string;
    description: string;
    website: string;
    location: string;
    targetAudience: string[];
    monthlyBudget: number;
    createdAt: Date;
    updatedAt: Date;
}

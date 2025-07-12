import { User } from '../../users/entities/user.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';
export declare class BrandProfile {
    id: string;
    user: User;
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
    campaigns: Campaign[];
}

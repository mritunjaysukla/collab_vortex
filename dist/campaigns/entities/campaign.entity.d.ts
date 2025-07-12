import { BrandProfile } from '../../brand-profile/entities/brand-profile.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { Platform } from '../../common/enums';
export declare class Campaign {
    id: string;
    brandProfile: BrandProfile;
    title: string;
    description: string;
    budget: number;
    targetAudience: string[];
    startDate: Date;
    endDate: Date;
    platforms: Platform[];
    deliverables: string[];
    requirements: {
        minFollowers?: number;
        minEngagementRate?: number;
        ageRange?: string;
        location?: string[];
        niches?: string[];
    };
    isActive: boolean;
    isFeatured: boolean;
    createdAt: Date;
    updatedAt: Date;
    proposals: Proposal[];
    collaborations: Collaboration[];
}

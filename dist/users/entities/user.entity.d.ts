import { UserRole } from '../../common/enums';
import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { BrandProfile } from '../../brand-profile/entities/brand-profile.entity';
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    creatorProfile?: CreatorProfile;
    brandProfile?: BrandProfile;
}

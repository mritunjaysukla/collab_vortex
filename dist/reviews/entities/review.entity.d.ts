import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { User } from '../../users/entities/user.entity';
import { ReviewVisibility } from '../../common/enums';
export declare class Review {
    id: string;
    collaboration: Collaboration;
    reviewer: User;
    reviewee: User;
    rating: number;
    feedback: string;
    visibility: ReviewVisibility;
    tags: string[];
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

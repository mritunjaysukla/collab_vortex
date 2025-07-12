import { ReviewVisibility } from '../../common/enums';
export declare class CreateReviewDto {
    revieweeId: string;
    collaborationId: string;
    rating: number;
    comment: string;
    visibility?: ReviewVisibility;
}
declare const UpdateReviewDto_base: import("@nestjs/common").Type<Partial<CreateReviewDto>>;
export declare class UpdateReviewDto extends UpdateReviewDto_base {
    rating?: number;
    comment?: string;
    visibility?: ReviewVisibility;
}
export declare class ReviewResponseDto {
    id: string;
    collaborationId: string;
    reviewer: {
        id: string;
        email: string;
    };
    reviewee: {
        id: string;
        email: string;
    };
    rating: number;
    comment: string;
    visibility: ReviewVisibility;
    createdAt: Date;
    updatedAt: Date;
}
export declare class ReviewStatsDto {
    averageRating: number;
    totalReviews: number;
    positiveReviews: number;
    negativeReviews: number;
    ratingDistribution: {
        rating: number;
        count: number;
    }[];
}
export {};

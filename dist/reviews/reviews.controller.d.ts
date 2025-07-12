import { ReviewService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(req: any, createReviewDto: CreateReviewDto): Promise<import("./entities/review.entity").Review>;
    findAll(): Promise<import("./entities/review.entity").Review[]>;
    findByUser(userId: string): Promise<import("./entities/review.entity").Review[]>;
    findMyReviews(req: any): Promise<import("./entities/review.entity").Review[]>;
    findByCollaboration(collaborationId: string): Promise<import("./entities/review.entity").Review[]>;
    getStats(userId: string): Promise<any>;
    getRecentReviews(userId: string, limit?: number): Promise<import("./entities/review.entity").Review[]>;
    findOne(id: string): Promise<import("./entities/review.entity").Review>;
    update(id: string, req: any, updateReviewDto: UpdateReviewDto): Promise<import("./entities/review.entity").Review>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}

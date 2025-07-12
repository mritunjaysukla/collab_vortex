import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';
export declare class ReviewService {
    private readonly reviewRepository;
    constructor(reviewRepository: Repository<Review>);
    create(reviewerUserId: string, createReviewDto: CreateReviewDto): Promise<Review>;
    findAll(): Promise<Review[]>;
    findByReviewee(revieweeId: string): Promise<Review[]>;
    findByReviewer(reviewerId: string): Promise<Review[]>;
    findByCollaboration(collaborationId: string): Promise<Review[]>;
    findOne(id: string): Promise<Review>;
    update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<Review>;
    remove(id: string, userId: string): Promise<void>;
    getReviewStats(userId: string): Promise<any>;
    getRecentReviews(userId: string, limit?: number): Promise<Review[]>;
}

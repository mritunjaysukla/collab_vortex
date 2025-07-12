"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const review_entity_1 = require("./entities/review.entity");
let ReviewService = class ReviewService {
    constructor(reviewRepository) {
        this.reviewRepository = reviewRepository;
    }
    async create(reviewerUserId, createReviewDto) {
        const review = this.reviewRepository.create({
            ...createReviewDto,
            reviewer: { id: reviewerUserId },
            reviewee: { id: createReviewDto.revieweeId },
            collaboration: { id: createReviewDto.collaborationId },
        });
        return await this.reviewRepository.save(review);
    }
    async findAll() {
        return await this.reviewRepository.find({
            relations: ['reviewer', 'reviewee', 'collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByReviewee(revieweeId) {
        return await this.reviewRepository.find({
            where: { reviewee: { id: revieweeId } },
            relations: ['reviewer', 'collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByReviewer(reviewerId) {
        return await this.reviewRepository.find({
            where: { reviewer: { id: reviewerId } },
            relations: ['reviewee', 'collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByCollaboration(collaborationId) {
        return await this.reviewRepository.find({
            where: { collaboration: { id: collaborationId } },
            relations: ['reviewer', 'reviewee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const review = await this.reviewRepository.findOne({
            where: { id },
            relations: ['reviewer', 'reviewee', 'collaboration'],
        });
        if (!review) {
            throw new common_1.NotFoundException(`Review with ID ${id} not found`);
        }
        return review;
    }
    async update(id, userId, updateReviewDto) {
        const review = await this.findOne(id);
        if (review.reviewer.id !== userId) {
            throw new common_1.ForbiddenException('You can only update your own reviews');
        }
        Object.assign(review, updateReviewDto);
        return await this.reviewRepository.save(review);
    }
    async remove(id, userId) {
        const review = await this.findOne(id);
        if (review.reviewer.id !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own reviews');
        }
        await this.reviewRepository.remove(review);
    }
    async getReviewStats(userId) {
        const stats = await this.reviewRepository
            .createQueryBuilder('review')
            .select([
            'AVG(review.rating) as averageRating',
            'COUNT(review.id) as totalReviews',
            'COUNT(CASE WHEN review.rating >= 4 THEN 1 END) as positiveReviews',
            'COUNT(CASE WHEN review.rating <= 2 THEN 1 END) as negativeReviews',
        ])
            .where('review.revieweeId = :userId', { userId })
            .getRawOne();
        const ratingDistribution = await this.reviewRepository
            .createQueryBuilder('review')
            .select('review.rating as rating, COUNT(review.id) as count')
            .where('review.revieweeId = :userId', { userId })
            .groupBy('review.rating')
            .orderBy('review.rating', 'DESC')
            .getRawMany();
        return {
            averageRating: parseFloat(stats.averageRating) || 0,
            totalReviews: parseInt(stats.totalReviews) || 0,
            positiveReviews: parseInt(stats.positiveReviews) || 0,
            negativeReviews: parseInt(stats.negativeReviews) || 0,
            ratingDistribution: ratingDistribution.map(item => ({
                rating: item.rating,
                count: parseInt(item.count),
            })),
        };
    }
    async getRecentReviews(userId, limit = 10) {
        return await this.reviewRepository.find({
            where: { reviewee: { id: userId } },
            relations: ['reviewer', 'collaboration'],
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewService);
//# sourceMappingURL=reviews.service.js.map
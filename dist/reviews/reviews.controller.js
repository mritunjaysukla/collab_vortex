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
exports.ReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reviews_service_1 = require("./reviews.service");
const review_dto_1 = require("./dto/review.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    async create(req, createReviewDto) {
        return await this.reviewService.create(req.user.id, createReviewDto);
    }
    async findAll() {
        return await this.reviewService.findAll();
    }
    async findByUser(userId) {
        return await this.reviewService.findByReviewee(userId);
    }
    async findMyReviews(req) {
        return await this.reviewService.findByReviewer(req.user.id);
    }
    async findByCollaboration(collaborationId) {
        return await this.reviewService.findByCollaboration(collaborationId);
    }
    async getStats(userId) {
        return await this.reviewService.getReviewStats(userId);
    }
    async getRecentReviews(userId, limit) {
        return await this.reviewService.getRecentReviews(userId, limit);
    }
    async findOne(id) {
        return await this.reviewService.findOne(id);
    }
    async update(id, req, updateReviewDto) {
        return await this.reviewService.update(id, req.user.id, updateReviewDto);
    }
    async remove(id, req) {
        await this.reviewService.remove(id, req.user.id);
        return { message: 'Review deleted successfully' };
    }
};
exports.ReviewController = ReviewController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new review' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review created successfully', type: review_dto_1.ReviewResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, review_dto_1.CreateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all reviews (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all reviews', type: [review_dto_1.ReviewResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a specific user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved user reviews', type: [review_dto_1.ReviewResponseDto] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('my-reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews written by current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved my reviews', type: [review_dto_1.ReviewResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findMyReviews", null);
__decorate([
    (0, common_1.Get)('collaboration/:collaborationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get reviews for a collaboration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved collaboration reviews', type: [review_dto_1.ReviewResponseDto] }),
    __param(0, (0, common_1.Param)('collaborationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findByCollaboration", null);
__decorate([
    (0, common_1.Get)('stats/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get review statistics for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved review stats', type: review_dto_1.ReviewStatsDto }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('recent/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get recent reviews for a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved recent reviews', type: [review_dto_1.ReviewResponseDto] }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getRecentReviews", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved review', type: review_dto_1.ReviewResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review updated successfully', type: review_dto_1.ReviewResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, review_dto_1.UpdateReviewDto]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a review' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Review deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "remove", null);
exports.ReviewController = ReviewController = __decorate([
    (0, swagger_1.ApiTags)('reviews'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewService])
], ReviewController);
//# sourceMappingURL=reviews.controller.js.map
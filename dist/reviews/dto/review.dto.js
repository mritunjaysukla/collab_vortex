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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewStatsDto = exports.ReviewResponseDto = exports.UpdateReviewDto = exports.CreateReviewDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class CreateReviewDto {
    constructor() {
        this.visibility = enums_1.ReviewVisibility.PUBLIC;
    }
}
exports.CreateReviewDto = CreateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-reviewee-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "revieweeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-collaboration-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "collaborationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5, minimum: 1, maximum: 5 }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], CreateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Great collaboration! Professional and delivered high-quality content on time.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ReviewVisibility, example: enums_1.ReviewVisibility.PUBLIC }),
    (0, class_validator_1.IsEnum)(enums_1.ReviewVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReviewDto.prototype, "visibility", void 0);
class UpdateReviewDto extends (0, swagger_1.PartialType)(CreateReviewDto) {
}
exports.UpdateReviewDto = UpdateReviewDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4, minimum: 1, maximum: 5, required: false }),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateReviewDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated review comment', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ReviewVisibility, required: false }),
    (0, class_validator_1.IsEnum)(enums_1.ReviewVisibility),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateReviewDto.prototype, "visibility", void 0);
class ReviewResponseDto {
}
exports.ReviewResponseDto = ReviewResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-review-id' }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-collaboration-id' }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "collaborationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { id: 'uuid-reviewer-id', email: 'reviewer@example.com' } }),
    __metadata("design:type", Object)
], ReviewResponseDto.prototype, "reviewer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { id: 'uuid-reviewee-id', email: 'reviewee@example.com' } }),
    __metadata("design:type", Object)
], ReviewResponseDto.prototype, "reviewee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], ReviewResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Excellent collaboration!' }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ReviewVisibility, example: enums_1.ReviewVisibility.PUBLIC }),
    __metadata("design:type", String)
], ReviewResponseDto.prototype, "visibility", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReviewResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ReviewResponseDto.prototype, "updatedAt", void 0);
class ReviewStatsDto {
}
exports.ReviewStatsDto = ReviewStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5 }),
    __metadata("design:type", Number)
], ReviewStatsDto.prototype, "averageRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], ReviewStatsDto.prototype, "totalReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], ReviewStatsDto.prototype, "positiveReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], ReviewStatsDto.prototype, "negativeReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: [
            { rating: 5, count: 15 },
            { rating: 4, count: 8 },
            { rating: 3, count: 1 },
            { rating: 2, count: 1 },
            { rating: 1, count: 0 }
        ]
    }),
    __metadata("design:type", Array)
], ReviewStatsDto.prototype, "ratingDistribution", void 0);
//# sourceMappingURL=review.dto.js.map
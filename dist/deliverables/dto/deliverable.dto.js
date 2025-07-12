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
exports.DeliverableResponseDto = exports.ReviewDeliverableDto = exports.SubmitDeliverableDto = exports.UpdateDeliverableDto = exports.CreateDeliverableDto = exports.DeliverableStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var DeliverableStatus;
(function (DeliverableStatus) {
    DeliverableStatus["PENDING"] = "pending";
    DeliverableStatus["SUBMITTED"] = "submitted";
    DeliverableStatus["APPROVED"] = "approved";
    DeliverableStatus["REVISION_REQUESTED"] = "revision_requested";
    DeliverableStatus["REJECTED"] = "rejected";
})(DeliverableStatus || (exports.DeliverableStatus = DeliverableStatus = {}));
class CreateDeliverableDto {
}
exports.CreateDeliverableDto = CreateDeliverableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable title' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliverableDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDeliverableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date for the deliverable', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateDeliverableDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Collaboration ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateDeliverableDto.prototype, "collaborationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateDeliverableDto.prototype, "metadata", void 0);
class UpdateDeliverableDto {
}
exports.UpdateDeliverableDto = UpdateDeliverableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable title', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDeliverableDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDeliverableDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content URL', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDeliverableDto.prototype, "contentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DeliverableStatus, description: 'Deliverable status', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(DeliverableStatus),
    __metadata("design:type", String)
], UpdateDeliverableDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Feedback on the deliverable', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateDeliverableDto.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date for the deliverable', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateDeliverableDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment URLs', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateDeliverableDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateDeliverableDto.prototype, "metadata", void 0);
class SubmitDeliverableDto {
}
exports.SubmitDeliverableDto = SubmitDeliverableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content URL' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SubmitDeliverableDto.prototype, "contentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment URLs', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SubmitDeliverableDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional metadata', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], SubmitDeliverableDto.prototype, "metadata", void 0);
class ReviewDeliverableDto {
}
exports.ReviewDeliverableDto = ReviewDeliverableDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DeliverableStatus, description: 'Review decision' }),
    (0, class_validator_1.IsEnum)(DeliverableStatus),
    __metadata("design:type", String)
], ReviewDeliverableDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Feedback on the deliverable', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ReviewDeliverableDto.prototype, "feedback", void 0);
class DeliverableResponseDto {
}
exports.DeliverableResponseDto = DeliverableResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable ID' }),
    __metadata("design:type", String)
], DeliverableResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable title' }),
    __metadata("design:type", String)
], DeliverableResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deliverable description' }),
    __metadata("design:type", String)
], DeliverableResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Content URL' }),
    __metadata("design:type", String)
], DeliverableResponseDto.prototype, "contentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: DeliverableStatus, description: 'Deliverable status' }),
    __metadata("design:type", String)
], DeliverableResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Feedback on the deliverable' }),
    __metadata("design:type", String)
], DeliverableResponseDto.prototype, "feedback", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of revisions requested' }),
    __metadata("design:type", Number)
], DeliverableResponseDto.prototype, "revisionCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Due date for the deliverable' }),
    __metadata("design:type", Date)
], DeliverableResponseDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When the deliverable was submitted' }),
    __metadata("design:type", Date)
], DeliverableResponseDto.prototype, "submittedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When the deliverable was approved' }),
    __metadata("design:type", Date)
], DeliverableResponseDto.prototype, "approvedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Attachment URLs' }),
    __metadata("design:type", Array)
], DeliverableResponseDto.prototype, "attachments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional metadata' }),
    __metadata("design:type", Object)
], DeliverableResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When the deliverable was created' }),
    __metadata("design:type", Date)
], DeliverableResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When the deliverable was last updated' }),
    __metadata("design:type", Date)
], DeliverableResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated collaboration' }),
    __metadata("design:type", Object)
], DeliverableResponseDto.prototype, "collaboration", void 0);
//# sourceMappingURL=deliverable.dto.js.map
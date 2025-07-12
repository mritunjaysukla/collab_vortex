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
exports.ProposalResponseDto = exports.UpdateProposalDto = exports.CreateProposalDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
class CreateProposalDto {
}
exports.CreateProposalDto = CreateProposalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-campaign-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "campaignId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'I would love to work on this campaign...' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "customMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500.00 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateProposalDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://myportfolio.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "portfolioLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Instagram post with swipe-up', 'TikTok dance video'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateProposalDto.prototype, "deliverableProposals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "proposedStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-30' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateProposalDto.prototype, "proposedEndDate", void 0);
class UpdateProposalDto {
}
exports.UpdateProposalDto = UpdateProposalDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated proposal message' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "customMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1750.00 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateProposalDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ProposalStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.ProposalStatus),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://updated-portfolio.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "portfolioLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Updated deliverable proposal'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateProposalDto.prototype, "deliverableProposals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "proposedStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "proposedEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Budget constraints' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProposalDto.prototype, "rejectionReason", void 0);
class ProposalResponseDto {
}
exports.ProposalResponseDto = ProposalResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-string' }),
    __metadata("design:type", String)
], ProposalResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'I would love to work on this campaign...' }),
    __metadata("design:type", String)
], ProposalResponseDto.prototype, "customMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500.00 }),
    __metadata("design:type", Number)
], ProposalResponseDto.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.ProposalStatus }),
    __metadata("design:type", String)
], ProposalResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://myportfolio.com' }),
    __metadata("design:type", String)
], ProposalResponseDto.prototype, "portfolioLink", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Instagram post with swipe-up', 'TikTok dance video'] }),
    __metadata("design:type", Array)
], ProposalResponseDto.prototype, "deliverableProposals", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-15' }),
    __metadata("design:type", Date)
], ProposalResponseDto.prototype, "proposedStartDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-30' }),
    __metadata("design:type", Date)
], ProposalResponseDto.prototype, "proposedEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Budget constraints' }),
    __metadata("design:type", String)
], ProposalResponseDto.prototype, "rejectionReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ProposalResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], ProposalResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=proposal.dto.js.map
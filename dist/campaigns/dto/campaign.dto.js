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
exports.CampaignResponseDto = exports.UpdateCampaignDto = exports.CreateCampaignDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
class CampaignRequirementsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CampaignRequirementsDto.prototype, "minFollowers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CampaignRequirementsDto.prototype, "minEngagementRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '18-35' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CampaignRequirementsDto.prototype, "ageRange", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['New York', 'Los Angeles'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CampaignRequirementsDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['lifestyle', 'fashion'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CampaignRequirementsDto.prototype, "niches", void 0);
class CreateCampaignDto {
}
exports.CreateCampaignDto = CreateCampaignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Summer Fashion Collection 2024' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Promote our new summer collection with authentic lifestyle content' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000.00 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['young adults', 'fashion enthusiasts'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCampaignDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-01' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-31' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCampaignDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.Platform, isArray: true, example: [enums_1.Platform.INSTAGRAM, enums_1.Platform.TIKTOK] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.Platform, { each: true }),
    __metadata("design:type", Array)
], CreateCampaignDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['2 Instagram posts', '1 TikTok video', '3 stories'] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCampaignDto.prototype, "deliverables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CampaignRequirementsDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CampaignRequirementsDto),
    __metadata("design:type", CampaignRequirementsDto)
], CreateCampaignDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCampaignDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCampaignDto.prototype, "isFeatured", void 0);
class UpdateCampaignDto {
}
exports.UpdateCampaignDto = UpdateCampaignDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated Campaign Title' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated campaign description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7500.00 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateCampaignDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['millennials', 'gen-z'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCampaignDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-31' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCampaignDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.Platform, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(enums_1.Platform, { each: true }),
    __metadata("design:type", Array)
], UpdateCampaignDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['3 Instagram posts', '2 TikTok videos'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCampaignDto.prototype, "deliverables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CampaignRequirementsDto }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CampaignRequirementsDto),
    __metadata("design:type", CampaignRequirementsDto)
], UpdateCampaignDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCampaignDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCampaignDto.prototype, "isFeatured", void 0);
class CampaignResponseDto {
}
exports.CampaignResponseDto = CampaignResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-string' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Summer Fashion Collection 2024' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Promote our new summer collection with authentic lifestyle content' }),
    __metadata("design:type", String)
], CampaignResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000.00 }),
    __metadata("design:type", Number)
], CampaignResponseDto.prototype, "budget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['young adults', 'fashion enthusiasts'] }),
    __metadata("design:type", Array)
], CampaignResponseDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-01' }),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-31' }),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.Platform, isArray: true }),
    __metadata("design:type", Array)
], CampaignResponseDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['2 Instagram posts', '1 TikTok video', '3 stories'] }),
    __metadata("design:type", Array)
], CampaignResponseDto.prototype, "deliverables", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: CampaignRequirementsDto }),
    __metadata("design:type", CampaignRequirementsDto)
], CampaignResponseDto.prototype, "requirements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CampaignResponseDto.prototype, "isActive", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CampaignResponseDto.prototype, "isFeatured", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CampaignResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=campaign.dto.js.map
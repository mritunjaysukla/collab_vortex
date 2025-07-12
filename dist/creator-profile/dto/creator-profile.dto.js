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
exports.CreatorProfileResponseDto = exports.UpdateCreatorProfileDto = exports.CreateCreatorProfileDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class PlatformStatsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'instagram' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PlatformStatsDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "followers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "engagementRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1500 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "avgViews", void 0);
class CreateCreatorProfileDto {
}
exports.CreateCreatorProfileDto = CreateCreatorProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Passionate content creator focused on lifestyle and fashion' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCreatorProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/profile.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCreatorProfileDto.prototype, "profileImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PlatformStatsDto],
        example: [
            {
                platform: 'instagram',
                followers: 10000,
                engagementRate: 5.2,
                avgViews: 1500,
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlatformStatsDto),
    __metadata("design:type", Array)
], CreateCreatorProfileDto.prototype, "platformStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['lifestyle', 'fashion', 'travel'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateCreatorProfileDto.prototype, "niches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New York, NY' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCreatorProfileDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://mywebsite.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCreatorProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/mediakit.pdf' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateCreatorProfileDto.prototype, "mediaKit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500.00 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateCreatorProfileDto.prototype, "baseRate", void 0);
class UpdateCreatorProfileDto {
}
exports.UpdateCreatorProfileDto = UpdateCreatorProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated bio content' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCreatorProfileDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/new-profile.jpg' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateCreatorProfileDto.prototype, "profileImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PlatformStatsDto],
        example: [
            {
                platform: 'instagram',
                followers: 12000,
                engagementRate: 5.8,
                avgViews: 1800,
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PlatformStatsDto),
    __metadata("design:type", Array)
], UpdateCreatorProfileDto.prototype, "platformStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCreatorProfileDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['lifestyle', 'fitness', 'health'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateCreatorProfileDto.prototype, "niches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Los Angeles, CA' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCreatorProfileDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://newwebsite.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateCreatorProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/new-mediakit.pdf' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateCreatorProfileDto.prototype, "mediaKit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 750.00 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateCreatorProfileDto.prototype, "baseRate", void 0);
class CreatorProfileResponseDto {
}
exports.CreatorProfileResponseDto = CreatorProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-string' }),
    __metadata("design:type", String)
], CreatorProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Passionate content creator focused on lifestyle and fashion' }),
    __metadata("design:type", String)
], CreatorProfileResponseDto.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/profile.jpg' }),
    __metadata("design:type", String)
], CreatorProfileResponseDto.prototype, "profileImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PlatformStatsDto],
        example: [
            {
                platform: 'instagram',
                followers: 10000,
                engagementRate: 5.2,
                avgViews: 1500,
            },
        ],
    }),
    __metadata("design:type", Array)
], CreatorProfileResponseDto.prototype, "platformStats", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], CreatorProfileResponseDto.prototype, "isVerified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['lifestyle', 'fashion', 'travel'] }),
    __metadata("design:type", Array)
], CreatorProfileResponseDto.prototype, "niches", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New York, NY' }),
    __metadata("design:type", String)
], CreatorProfileResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://mywebsite.com' }),
    __metadata("design:type", String)
], CreatorProfileResponseDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/mediakit.pdf' }),
    __metadata("design:type", String)
], CreatorProfileResponseDto.prototype, "mediaKit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 500.00 }),
    __metadata("design:type", Number)
], CreatorProfileResponseDto.prototype, "baseRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreatorProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CreatorProfileResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=creator-profile.dto.js.map
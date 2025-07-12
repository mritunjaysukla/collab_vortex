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
exports.PlatformStatsDto = exports.PlatformIntegrationResponseDto = exports.ConnectPlatformDto = exports.UpdatePlatformIntegrationDto = exports.CreatePlatformIntegrationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class CreatePlatformIntegrationDto {
}
exports.CreatePlatformIntegrationDto = CreatePlatformIntegrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.Platform, example: enums_1.Platform.INSTAGRAM }),
    (0, class_validator_1.IsEnum)(enums_1.Platform),
    __metadata("design:type", String)
], CreatePlatformIntegrationDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Optional initial platform username', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlatformIntegrationDto.prototype, "platformUsername", void 0);
class UpdatePlatformIntegrationDto extends (0, swagger_1.PartialType)(CreatePlatformIntegrationDto) {
}
exports.UpdatePlatformIntegrationDto = UpdatePlatformIntegrationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'connected', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePlatformIntegrationDto.prototype, "syncStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'platform_user_123', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePlatformIntegrationDto.prototype, "platformUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator_username', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePlatformIntegrationDto.prototype, "platformUsername", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { followerCount: 10000, engagementRate: 5.2 },
        required: false
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdatePlatformIntegrationDto.prototype, "platformData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Connection error message', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePlatformIntegrationDto.prototype, "errorMessage", void 0);
class ConnectPlatformDto {
}
exports.ConnectPlatformDto = ConnectPlatformDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'oauth_access_token_here' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConnectPlatformDto.prototype, "authToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'oauth_refresh_token_here', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ConnectPlatformDto.prototype, "refreshToken", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'platform_user_123' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConnectPlatformDto.prototype, "platformUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator_username' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ConnectPlatformDto.prototype, "platformUsername", void 0);
class PlatformIntegrationResponseDto {
}
exports.PlatformIntegrationResponseDto = PlatformIntegrationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-integration-id' }),
    __metadata("design:type", String)
], PlatformIntegrationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.Platform, example: enums_1.Platform.INSTAGRAM }),
    __metadata("design:type", String)
], PlatformIntegrationResponseDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'connected' }),
    __metadata("design:type", String)
], PlatformIntegrationResponseDto.prototype, "syncStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-12T10:00:00Z', nullable: true }),
    __metadata("design:type", Date)
], PlatformIntegrationResponseDto.prototype, "lastSyncAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'creator_username', nullable: true }),
    __metadata("design:type", String)
], PlatformIntegrationResponseDto.prototype, "platformUsername", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'platform_user_123', nullable: true }),
    __metadata("design:type", String)
], PlatformIntegrationResponseDto.prototype, "platformUserId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: {
            followerCount: 10000,
            engagementRate: 5.2,
            profileUrl: 'https://instagram.com/creator_username'
        },
        nullable: true
    }),
    __metadata("design:type", Object)
], PlatformIntegrationResponseDto.prototype, "platformData", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", String)
], PlatformIntegrationResponseDto.prototype, "errorMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlatformIntegrationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlatformIntegrationResponseDto.prototype, "updatedAt", void 0);
class PlatformStatsDto {
}
exports.PlatformStatsDto = PlatformStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "totalIntegrations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "connectedIntegrations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "disconnectedIntegrations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "errorIntegrations", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['instagram', 'tiktok'] }),
    __metadata("design:type", Array)
], PlatformStatsDto.prototype, "platforms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "totalFollowers", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.8 }),
    __metadata("design:type", Number)
], PlatformStatsDto.prototype, "averageEngagement", void 0);
//# sourceMappingURL=platform-integration.dto.js.map
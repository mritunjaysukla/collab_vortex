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
exports.BrandProfileResponseDto = exports.UpdateBrandProfileDto = exports.CreateBrandProfileDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateBrandProfileDto {
}
exports.CreateBrandProfileDto = CreateBrandProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fashion Forward Inc.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fashion & Lifestyle' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50-100 employees' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Leading fashion brand focusing on sustainable clothing' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://fashionforward.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New York, NY' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBrandProfileDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['young adults', 'fashion enthusiasts', 'eco-conscious'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateBrandProfileDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000.00 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateBrandProfileDto.prototype, "monthlyBudget", void 0);
class UpdateBrandProfileDto {
}
exports.UpdateBrandProfileDto = UpdateBrandProfileDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated Fashion Forward Inc.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fashion & Technology' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/new-logo.png' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateBrandProfileDto.prototype, "verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '100-200 employees' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated brand description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://newfashionforward.com' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Los Angeles, CA' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateBrandProfileDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['millennials', 'gen-z', 'sustainability advocates'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateBrandProfileDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 75000.00 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], UpdateBrandProfileDto.prototype, "monthlyBudget", void 0);
class BrandProfileResponseDto {
}
exports.BrandProfileResponseDto = BrandProfileResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-string' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fashion Forward Inc.' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "companyName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fashion & Lifestyle' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/logo.png' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "logoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], BrandProfileResponseDto.prototype, "verified", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '50-100 employees' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "teamSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Leading fashion brand focusing on sustainable clothing' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://fashionforward.com' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'New York, NY' }),
    __metadata("design:type", String)
], BrandProfileResponseDto.prototype, "location", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['young adults', 'fashion enthusiasts', 'eco-conscious'] }),
    __metadata("design:type", Array)
], BrandProfileResponseDto.prototype, "targetAudience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50000.00 }),
    __metadata("design:type", Number)
], BrandProfileResponseDto.prototype, "monthlyBudget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BrandProfileResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], BrandProfileResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=brand-profile.dto.js.map
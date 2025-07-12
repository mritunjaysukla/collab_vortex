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
exports.BrandProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const brand_profile_service_1 = require("./brand-profile.service");
const brand_profile_dto_1 = require("./dto/brand-profile.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let BrandProfileController = class BrandProfileController {
    constructor(brandProfileService) {
        this.brandProfileService = brandProfileService;
    }
    async create(req, createBrandProfileDto) {
        return await this.brandProfileService.create(req.user.id, createBrandProfileDto);
    }
    async findAll() {
        return await this.brandProfileService.findAll();
    }
    async findVerified() {
        return await this.brandProfileService.findVerifiedBrands();
    }
    async findByIndustry(industry) {
        return await this.brandProfileService.findByIndustry(industry);
    }
    async getMyProfile(req) {
        return await this.brandProfileService.findByUserId(req.user.id);
    }
    async findOne(id) {
        return await this.brandProfileService.findOne(id);
    }
    async update(id, updateBrandProfileDto) {
        return await this.brandProfileService.update(id, updateBrandProfileDto);
    }
    async remove(id) {
        await this.brandProfileService.remove(id);
        return { message: 'Brand profile deleted successfully' };
    }
};
exports.BrandProfileController = BrandProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create brand profile' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Brand profile created successfully',
        type: brand_profile_dto_1.BrandProfileResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, brand_profile_dto_1.CreateBrandProfileDto]),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all brand profiles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of brand profiles',
        type: [brand_profile_dto_1.BrandProfileResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('verified'),
    (0, swagger_1.ApiOperation)({ summary: 'Get verified brand profiles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of verified brand profiles',
        type: [brand_profile_dto_1.BrandProfileResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "findVerified", null);
__decorate([
    (0, common_1.Get)('search/industry'),
    (0, swagger_1.ApiOperation)({ summary: 'Search brands by industry' }),
    (0, swagger_1.ApiQuery)({
        name: 'industry',
        description: 'Industry to filter by',
        example: 'Fashion & Lifestyle',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of brands in the specified industry',
        type: [brand_profile_dto_1.BrandProfileResponseDto],
    }),
    __param(0, (0, common_1.Query)('industry')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "findByIndustry", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user brand profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Current user brand profile',
        type: brand_profile_dto_1.BrandProfileResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get brand profile by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand profile ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Brand profile found',
        type: brand_profile_dto_1.BrandProfileResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update brand profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand profile ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Brand profile updated successfully',
        type: brand_profile_dto_1.BrandProfileResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, brand_profile_dto_1.UpdateBrandProfileDto]),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete brand profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Brand profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Brand profile deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BrandProfileController.prototype, "remove", null);
exports.BrandProfileController = BrandProfileController = __decorate([
    (0, swagger_1.ApiTags)('brand-profiles'),
    (0, common_1.Controller)('brand-profiles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [brand_profile_service_1.BrandProfileService])
], BrandProfileController);
//# sourceMappingURL=brand-profile.controller.js.map
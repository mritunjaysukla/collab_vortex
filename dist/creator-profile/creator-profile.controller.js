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
exports.CreatorProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const creator_profile_service_1 = require("./creator-profile.service");
const creator_profile_dto_1 = require("./dto/creator-profile.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let CreatorProfileController = class CreatorProfileController {
    constructor(creatorProfileService) {
        this.creatorProfileService = creatorProfileService;
    }
    async create(req, createCreatorProfileDto) {
        return await this.creatorProfileService.create(req.user.id, createCreatorProfileDto);
    }
    async findAll() {
        return await this.creatorProfileService.findAll();
    }
    async findVerified() {
        return await this.creatorProfileService.findVerifiedCreators();
    }
    async searchByNiches(niches) {
        const nichesArray = Array.isArray(niches) ? niches : [niches];
        return await this.creatorProfileService.findByNiches(nichesArray);
    }
    async getMyProfile(req) {
        return await this.creatorProfileService.findByUserId(req.user.id);
    }
    async findOne(id) {
        return await this.creatorProfileService.findOne(id);
    }
    async update(id, updateCreatorProfileDto) {
        return await this.creatorProfileService.update(id, updateCreatorProfileDto);
    }
    async remove(id) {
        await this.creatorProfileService.remove(id);
        return { message: 'Creator profile deleted successfully' };
    }
};
exports.CreatorProfileController = CreatorProfileController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create creator profile' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Creator profile created successfully',
        type: creator_profile_dto_1.CreatorProfileResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, creator_profile_dto_1.CreateCreatorProfileDto]),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all creator profiles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of all creator profiles',
        type: [creator_profile_dto_1.CreatorProfileResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('verified'),
    (0, swagger_1.ApiOperation)({ summary: 'Get verified creator profiles' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of verified creator profiles',
        type: [creator_profile_dto_1.CreatorProfileResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "findVerified", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search creators by niches' }),
    (0, swagger_1.ApiQuery)({ name: 'niches', type: [String], example: ['lifestyle', 'fashion'] }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Creators matching the niches',
        type: [creator_profile_dto_1.CreatorProfileResponseDto],
    }),
    __param(0, (0, common_1.Query)('niches')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "searchByNiches", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user creator profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Current user creator profile',
        type: creator_profile_dto_1.CreatorProfileResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get creator profile by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Creator profile ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Creator profile found',
        type: creator_profile_dto_1.CreatorProfileResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update creator profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Creator profile ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Creator profile updated successfully',
        type: creator_profile_dto_1.CreatorProfileResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, creator_profile_dto_1.UpdateCreatorProfileDto]),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete creator profile' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Creator profile ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Creator profile deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CreatorProfileController.prototype, "remove", null);
exports.CreatorProfileController = CreatorProfileController = __decorate([
    (0, swagger_1.ApiTags)('creator-profiles'),
    (0, common_1.Controller)('creator-profiles'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [creator_profile_service_1.CreatorProfileService])
], CreatorProfileController);
//# sourceMappingURL=creator-profile.controller.js.map
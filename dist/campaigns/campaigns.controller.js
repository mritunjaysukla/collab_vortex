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
exports.CampaignController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const campaigns_service_1 = require("./campaigns.service");
const campaign_dto_1 = require("./dto/campaign.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let CampaignController = class CampaignController {
    constructor(campaignService) {
        this.campaignService = campaignService;
    }
    async create(req, createCampaignDto) {
        return await this.campaignService.create(req.user.id, createCampaignDto);
    }
    async findAll() {
        return await this.campaignService.findAll();
    }
    async findFeatured() {
        return await this.campaignService.findFeatured();
    }
    async findMyCampaigns(req) {
        return await this.campaignService.findByUserId(req.user.id);
    }
    async searchCampaigns(minBudget, maxBudget, platforms, niches) {
        const filters = {};
        if (minBudget || maxBudget) {
            filters.budget = {};
            if (minBudget)
                filters.budget.min = Number(minBudget);
            if (maxBudget)
                filters.budget.max = Number(maxBudget);
        }
        if (platforms) {
            filters.platforms = platforms.split(',');
        }
        if (niches) {
            filters.niches = niches.split(',');
        }
        return await this.campaignService.searchCampaigns(filters);
    }
    async findByPlatform(platform) {
        return await this.campaignService.findByPlatform(platform);
    }
    async findOne(id) {
        return await this.campaignService.findOne(id);
    }
    async update(id, updateCampaignDto) {
        return await this.campaignService.update(id, updateCampaignDto);
    }
    async remove(id) {
        await this.campaignService.remove(id);
        return { message: 'Campaign deleted successfully' };
    }
};
exports.CampaignController = CampaignController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new campaign' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Campaign created successfully',
        type: campaign_dto_1.CampaignResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, campaign_dto_1.CreateCampaignDto]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all active campaigns' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of active campaigns',
        type: [campaign_dto_1.CampaignResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('featured'),
    (0, swagger_1.ApiOperation)({ summary: 'Get featured campaigns' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of featured campaigns',
        type: [campaign_dto_1.CampaignResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "findFeatured", null);
__decorate([
    (0, common_1.Get)('my-campaigns'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user campaigns' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of user campaigns',
        type: [campaign_dto_1.CampaignResponseDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "findMyCampaigns", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search campaigns with filters' }),
    (0, swagger_1.ApiQuery)({ name: 'minBudget', required: false, example: 1000 }),
    (0, swagger_1.ApiQuery)({ name: 'maxBudget', required: false, example: 10000 }),
    (0, swagger_1.ApiQuery)({ name: 'platforms', required: false, example: 'instagram,tiktok' }),
    (0, swagger_1.ApiQuery)({ name: 'niches', required: false, example: 'lifestyle,fashion' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Filtered campaigns',
        type: [campaign_dto_1.CampaignResponseDto],
    }),
    __param(0, (0, common_1.Query)('minBudget')),
    __param(1, (0, common_1.Query)('maxBudget')),
    __param(2, (0, common_1.Query)('platforms')),
    __param(3, (0, common_1.Query)('niches')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "searchCampaigns", null);
__decorate([
    (0, common_1.Get)('platform/:platform'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaigns by platform' }),
    (0, swagger_1.ApiParam)({ name: 'platform', enum: enums_1.Platform }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Campaigns for the specified platform',
        type: [campaign_dto_1.CampaignResponseDto],
    }),
    __param(0, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "findByPlatform", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Campaign found',
        type: campaign_dto_1.CampaignResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Update campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Campaign updated successfully',
        type: campaign_dto_1.CampaignResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, campaign_dto_1.UpdateCampaignDto]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete campaign' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campaign deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CampaignController.prototype, "remove", null);
exports.CampaignController = CampaignController = __decorate([
    (0, swagger_1.ApiTags)('campaigns'),
    (0, common_1.Controller)('campaigns'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [campaigns_service_1.CampaignService])
], CampaignController);
//# sourceMappingURL=campaigns.controller.js.map
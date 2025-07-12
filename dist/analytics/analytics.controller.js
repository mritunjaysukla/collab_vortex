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
exports.AnalyticsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const analytics_service_1 = require("./analytics.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AnalyticsController = class AnalyticsController {
    constructor(analyticsService) {
        this.analyticsService = analyticsService;
    }
    async getCreatorAnalytics(creatorProfileId, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return await this.analyticsService.getCreatorAnalytics(creatorProfileId, start, end);
    }
    async getCreatorOverview(creatorProfileId) {
        return await this.analyticsService.getCreatorPerformanceOverview(creatorProfileId);
    }
    async getCampaignAnalytics(campaignId, startDate, endDate) {
        const start = startDate ? new Date(startDate) : undefined;
        const end = endDate ? new Date(endDate) : undefined;
        return await this.analyticsService.getCampaignAnalytics(campaignId, start, end);
    }
    async getCampaignOverview(campaignId) {
        return await this.analyticsService.getCampaignPerformanceOverview(campaignId);
    }
};
exports.AnalyticsController = AnalyticsController;
__decorate([
    (0, common_1.Get)('creator/:creatorProfileId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get creator analytics' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved creator analytics' }),
    __param(0, (0, common_1.Param)('creatorProfileId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCreatorAnalytics", null);
__decorate([
    (0, common_1.Get)('creator/:creatorProfileId/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get creator performance overview' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved creator performance overview' }),
    __param(0, (0, common_1.Param)('creatorProfileId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCreatorOverview", null);
__decorate([
    (0, common_1.Get)('campaign/:campaignId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign analytics' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: Date }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: Date }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved campaign analytics' }),
    __param(0, (0, common_1.Param)('campaignId')),
    __param(1, (0, common_1.Query)('startDate')),
    __param(2, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCampaignAnalytics", null);
__decorate([
    (0, common_1.Get)('campaign/:campaignId/overview'),
    (0, swagger_1.ApiOperation)({ summary: 'Get campaign performance overview' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved campaign performance overview' }),
    __param(0, (0, common_1.Param)('campaignId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnalyticsController.prototype, "getCampaignOverview", null);
exports.AnalyticsController = AnalyticsController = __decorate([
    (0, swagger_1.ApiTags)('analytics'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('analytics'),
    __metadata("design:paramtypes", [analytics_service_1.AnalyticsService])
], AnalyticsController);
//# sourceMappingURL=analytics.controller.js.map
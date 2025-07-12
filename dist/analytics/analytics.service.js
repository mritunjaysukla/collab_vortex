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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const creator_analytics_entity_1 = require("./entities/creator-analytics.entity");
const campaign_analytics_entity_1 = require("./entities/campaign-analytics.entity");
let AnalyticsService = class AnalyticsService {
    constructor(creatorAnalyticsRepository, campaignAnalyticsRepository) {
        this.creatorAnalyticsRepository = creatorAnalyticsRepository;
        this.campaignAnalyticsRepository = campaignAnalyticsRepository;
    }
    async getCreatorAnalytics(creatorProfileId, startDate, endDate) {
        const query = this.creatorAnalyticsRepository
            .createQueryBuilder('analytics')
            .where('analytics.creatorProfileId = :creatorProfileId', { creatorProfileId });
        if (startDate) {
            query.andWhere('analytics.date >= :startDate', { startDate });
        }
        if (endDate) {
            query.andWhere('analytics.date <= :endDate', { endDate });
        }
        return await query.orderBy('analytics.date', 'DESC').getMany();
    }
    async getCreatorPerformanceOverview(creatorProfileId) {
        const analytics = await this.getCreatorAnalytics(creatorProfileId);
        if (!analytics.length) {
            return {
                totalFollowers: 0,
                averageEngagement: 0,
                totalReach: 0,
                totalViews: 0,
                platforms: 0,
            };
        }
        const latest = analytics[0];
        const platforms = [...new Set(analytics.map(a => a.platform))];
        return {
            totalFollowers: latest.followers,
            averageEngagement: analytics.reduce((sum, a) => sum + Number(a.engagementRate), 0) / analytics.length,
            totalReach: analytics.reduce((sum, a) => sum + a.reach, 0),
            totalViews: analytics.reduce((sum, a) => sum + a.views, 0),
            platforms: platforms.length,
        };
    }
    async getCampaignAnalytics(campaignId, startDate, endDate) {
        const query = this.campaignAnalyticsRepository
            .createQueryBuilder('analytics')
            .where('analytics.campaignId = :campaignId', { campaignId });
        if (startDate) {
            query.andWhere('analytics.date >= :startDate', { startDate });
        }
        if (endDate) {
            query.andWhere('analytics.date <= :endDate', { endDate });
        }
        return await query.orderBy('analytics.date', 'DESC').getMany();
    }
    async getCampaignPerformanceOverview(campaignId) {
        const analytics = await this.getCampaignAnalytics(campaignId);
        if (!analytics.length) {
            return {
                totalImpressions: 0,
                totalReach: 0,
                totalEngagement: 0,
                totalClicks: 0,
                totalConversions: 0,
                totalCost: 0,
                averageCPM: 0,
                averageCPC: 0,
                averageROI: 0,
            };
        }
        return {
            totalImpressions: analytics.reduce((sum, a) => sum + a.impressions, 0),
            totalReach: analytics.reduce((sum, a) => sum + a.reach, 0),
            totalEngagement: analytics.reduce((sum, a) => sum + a.engagement, 0),
            totalClicks: analytics.reduce((sum, a) => sum + a.clicks, 0),
            totalConversions: analytics.reduce((sum, a) => sum + a.conversions, 0),
            totalCost: analytics.reduce((sum, a) => sum + Number(a.cost), 0),
            averageCPM: analytics.reduce((sum, a) => sum + Number(a.cpm), 0) / analytics.length,
            averageCPC: analytics.reduce((sum, a) => sum + Number(a.cpc), 0) / analytics.length,
            averageROI: analytics.reduce((sum, a) => sum + Number(a.roi), 0) / analytics.length,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(creator_analytics_entity_1.CreatorAnalytics)),
    __param(1, (0, typeorm_1.InjectRepository)(campaign_analytics_entity_1.CampaignAnalytics)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map
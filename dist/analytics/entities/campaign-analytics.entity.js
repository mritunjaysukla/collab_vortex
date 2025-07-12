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
exports.CampaignAnalytics = void 0;
const typeorm_1 = require("typeorm");
const campaign_entity_1 = require("../../campaigns/entities/campaign.entity");
const enums_1 = require("../../common/enums");
let CampaignAnalytics = class CampaignAnalytics {
};
exports.CampaignAnalytics = CampaignAnalytics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CampaignAnalytics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => campaign_entity_1.Campaign),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", campaign_entity_1.Campaign)
], CampaignAnalytics.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Platform,
    }),
    __metadata("design:type", String)
], CampaignAnalytics.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], CampaignAnalytics.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "impressions", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "reach", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "engagement", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "clicks", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "conversions", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "cost", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "cpm", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "cpc", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 4, default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "cpa", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CampaignAnalytics.prototype, "roi", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CampaignAnalytics.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CampaignAnalytics.prototype, "updatedAt", void 0);
exports.CampaignAnalytics = CampaignAnalytics = __decorate([
    (0, typeorm_1.Entity)('campaign_analytics')
], CampaignAnalytics);
//# sourceMappingURL=campaign-analytics.entity.js.map
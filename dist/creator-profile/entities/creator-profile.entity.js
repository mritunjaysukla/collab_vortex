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
exports.CreatorProfile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const proposal_entity_1 = require("../../proposals/entities/proposal.entity");
const platform_integration_entity_1 = require("../../platform-integrations/entities/platform-integration.entity");
const creator_analytics_entity_1 = require("../../analytics/entities/creator-analytics.entity");
let CreatorProfile = class CreatorProfile {
};
exports.CreatorProfile = CreatorProfile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CreatorProfile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.creatorProfile),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.User)
], CreatorProfile.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CreatorProfile.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CreatorProfile.prototype, "profileImage", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Array)
], CreatorProfile.prototype, "platformStats", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], CreatorProfile.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], CreatorProfile.prototype, "niches", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CreatorProfile.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CreatorProfile.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], CreatorProfile.prototype, "mediaKit", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], CreatorProfile.prototype, "baseRate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CreatorProfile.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CreatorProfile.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_entity_1.Proposal, (proposal) => proposal.creatorProfile),
    __metadata("design:type", Array)
], CreatorProfile.prototype, "proposals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => platform_integration_entity_1.PlatformIntegration, (integration) => integration.creatorProfile),
    __metadata("design:type", Array)
], CreatorProfile.prototype, "platformIntegrations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => creator_analytics_entity_1.CreatorAnalytics, (analytics) => analytics.creatorProfile),
    __metadata("design:type", Array)
], CreatorProfile.prototype, "analytics", void 0);
exports.CreatorProfile = CreatorProfile = __decorate([
    (0, typeorm_1.Entity)('creator_profiles')
], CreatorProfile);
//# sourceMappingURL=creator-profile.entity.js.map
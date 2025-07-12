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
exports.CreatorAnalytics = void 0;
const typeorm_1 = require("typeorm");
const creator_profile_entity_1 = require("../../creator-profile/entities/creator-profile.entity");
const enums_1 = require("../../common/enums");
let CreatorAnalytics = class CreatorAnalytics {
};
exports.CreatorAnalytics = CreatorAnalytics;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CreatorAnalytics.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => creator_profile_entity_1.CreatorProfile, (creatorProfile) => creatorProfile.analytics),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", creator_profile_entity_1.CreatorProfile)
], CreatorAnalytics.prototype, "creatorProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Platform,
    }),
    __metadata("design:type", String)
], CreatorAnalytics.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], CreatorAnalytics.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "engagementRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "reach", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "views", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "shares", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], CreatorAnalytics.prototype, "saves", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], CreatorAnalytics.prototype, "demographicData", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CreatorAnalytics.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], CreatorAnalytics.prototype, "updatedAt", void 0);
exports.CreatorAnalytics = CreatorAnalytics = __decorate([
    (0, typeorm_1.Entity)('creator_analytics')
], CreatorAnalytics);
//# sourceMappingURL=creator-analytics.entity.js.map
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
exports.PlatformIntegration = void 0;
const typeorm_1 = require("typeorm");
const creator_profile_entity_1 = require("../../creator-profile/entities/creator-profile.entity");
const enums_1 = require("../../common/enums");
let PlatformIntegration = class PlatformIntegration {
};
exports.PlatformIntegration = PlatformIntegration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => creator_profile_entity_1.CreatorProfile, (creatorProfile) => creatorProfile.platformIntegrations),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", creator_profile_entity_1.CreatorProfile)
], PlatformIntegration.prototype, "creatorProfile", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Platform,
    }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "authToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PlatformIntegration.prototype, "tokenExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'disconnected' }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "syncStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], PlatformIntegration.prototype, "lastSyncAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "platformUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "platformUsername", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], PlatformIntegration.prototype, "platformData", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], PlatformIntegration.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlatformIntegration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PlatformIntegration.prototype, "updatedAt", void 0);
exports.PlatformIntegration = PlatformIntegration = __decorate([
    (0, typeorm_1.Entity)('platform_integrations')
], PlatformIntegration);
//# sourceMappingURL=platform-integration.entity.js.map
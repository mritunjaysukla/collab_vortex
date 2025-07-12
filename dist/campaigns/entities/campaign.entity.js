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
exports.Campaign = void 0;
const typeorm_1 = require("typeorm");
const brand_profile_entity_1 = require("../../brand-profile/entities/brand-profile.entity");
const proposal_entity_1 = require("../../proposals/entities/proposal.entity");
const collaboration_entity_1 = require("../../collaborations/entities/collaboration.entity");
const enums_1 = require("../../common/enums");
let Campaign = class Campaign {
};
exports.Campaign = Campaign;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Campaign.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => brand_profile_entity_1.BrandProfile, (brandProfile) => brandProfile.campaigns),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", brand_profile_entity_1.BrandProfile)
], Campaign.prototype, "brandProfile", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Campaign.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Campaign.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], Campaign.prototype, "budget", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Campaign.prototype, "targetAudience", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Campaign.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Campaign.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.Platform,
        array: true,
        default: '{}',
    }),
    __metadata("design:type", Array)
], Campaign.prototype, "platforms", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Campaign.prototype, "deliverables", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Campaign.prototype, "requirements", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Campaign.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Campaign.prototype, "isFeatured", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Campaign.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Campaign.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proposal_entity_1.Proposal, (proposal) => proposal.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "proposals", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => collaboration_entity_1.Collaboration, (collaboration) => collaboration.campaign),
    __metadata("design:type", Array)
], Campaign.prototype, "collaborations", void 0);
exports.Campaign = Campaign = __decorate([
    (0, typeorm_1.Entity)('campaigns')
], Campaign);
//# sourceMappingURL=campaign.entity.js.map
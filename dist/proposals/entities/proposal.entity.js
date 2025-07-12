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
exports.Proposal = void 0;
const typeorm_1 = require("typeorm");
const creator_profile_entity_1 = require("../../creator-profile/entities/creator-profile.entity");
const campaign_entity_1 = require("../../campaigns/entities/campaign.entity");
const collaboration_entity_1 = require("../../collaborations/entities/collaboration.entity");
const enums_1 = require("../../common/enums");
let Proposal = class Proposal {
};
exports.Proposal = Proposal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Proposal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => creator_profile_entity_1.CreatorProfile, (creatorProfile) => creatorProfile.proposals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", creator_profile_entity_1.CreatorProfile)
], Proposal.prototype, "creatorProfile", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => campaign_entity_1.Campaign, (campaign) => campaign.proposals),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", campaign_entity_1.Campaign)
], Proposal.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Proposal.prototype, "customMessage", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Proposal.prototype, "rate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.ProposalStatus,
        default: enums_1.ProposalStatus.PENDING,
    }),
    __metadata("design:type", String)
], Proposal.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Proposal.prototype, "portfolioLink", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Proposal.prototype, "deliverableProposals", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Proposal.prototype, "proposedStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Proposal.prototype, "proposedEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Proposal.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Proposal.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Proposal.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => collaboration_entity_1.Collaboration, (collaboration) => collaboration.proposal),
    __metadata("design:type", collaboration_entity_1.Collaboration)
], Proposal.prototype, "collaboration", void 0);
exports.Proposal = Proposal = __decorate([
    (0, typeorm_1.Entity)('proposals')
], Proposal);
//# sourceMappingURL=proposal.entity.js.map
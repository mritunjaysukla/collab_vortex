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
exports.Collaboration = void 0;
const typeorm_1 = require("typeorm");
const campaign_entity_1 = require("../../campaigns/entities/campaign.entity");
const proposal_entity_1 = require("../../proposals/entities/proposal.entity");
const contract_entity_1 = require("../../contracts/entities/contract.entity");
const deliverable_entity_1 = require("../../deliverables/entities/deliverable.entity");
const review_entity_1 = require("../../reviews/entities/review.entity");
const enums_1 = require("../../common/enums");
let Collaboration = class Collaboration {
};
exports.Collaboration = Collaboration;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Collaboration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => campaign_entity_1.Campaign, (campaign) => campaign.collaborations),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", campaign_entity_1.Campaign)
], Collaboration.prototype, "campaign", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => proposal_entity_1.Proposal, (proposal) => proposal.collaboration),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", proposal_entity_1.Proposal)
], Collaboration.prototype, "proposal", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => contract_entity_1.Contract, (contract) => contract.collaboration),
    __metadata("design:type", contract_entity_1.Contract)
], Collaboration.prototype, "contract", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Collaboration.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], Collaboration.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.CollaborationStatus,
        default: enums_1.CollaborationStatus.PENDING,
    }),
    __metadata("design:type", String)
], Collaboration.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Collaboration.prototype, "isCompleted", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Collaboration.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 3, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Collaboration.prototype, "progress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Collaboration.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Collaboration.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => deliverable_entity_1.Deliverable, (deliverable) => deliverable.collaboration),
    __metadata("design:type", Array)
], Collaboration.prototype, "deliverables", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.collaboration),
    __metadata("design:type", Array)
], Collaboration.prototype, "reviews", void 0);
exports.Collaboration = Collaboration = __decorate([
    (0, typeorm_1.Entity)('collaborations')
], Collaboration);
//# sourceMappingURL=collaboration.entity.js.map
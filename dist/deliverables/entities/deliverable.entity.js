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
exports.Deliverable = void 0;
const typeorm_1 = require("typeorm");
const collaboration_entity_1 = require("../../collaborations/entities/collaboration.entity");
const enums_1 = require("../../common/enums");
let Deliverable = class Deliverable {
};
exports.Deliverable = Deliverable;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Deliverable.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => collaboration_entity_1.Collaboration, (collaboration) => collaboration.deliverables),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", collaboration_entity_1.Collaboration)
], Deliverable.prototype, "collaboration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Deliverable.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Deliverable.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Deliverable.prototype, "contentUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: enums_1.DeliverableStatus,
        default: enums_1.DeliverableStatus.PENDING,
    }),
    __metadata("design:type", String)
], Deliverable.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], Deliverable.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Deliverable.prototype, "revisionCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Deliverable.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Deliverable.prototype, "submittedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Deliverable.prototype, "approvedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { array: true, default: '{}' }),
    __metadata("design:type", Array)
], Deliverable.prototype, "attachments", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { nullable: true }),
    __metadata("design:type", Object)
], Deliverable.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Deliverable.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Deliverable.prototype, "updatedAt", void 0);
exports.Deliverable = Deliverable = __decorate([
    (0, typeorm_1.Entity)('deliverables')
], Deliverable);
//# sourceMappingURL=deliverable.entity.js.map
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
exports.DeliverableService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const deliverable_entity_1 = require("./entities/deliverable.entity");
const deliverable_dto_1 = require("./dto/deliverable.dto");
let DeliverableService = class DeliverableService {
    constructor(deliverableRepository) {
        this.deliverableRepository = deliverableRepository;
    }
    async create(createDeliverableDto) {
        const { collaborationId, dueDate, ...deliverableData } = createDeliverableDto;
        const deliverable = new deliverable_entity_1.Deliverable();
        deliverable.title = deliverableData.title;
        deliverable.description = deliverableData.description;
        deliverable.metadata = deliverableData.metadata;
        deliverable.collaboration = { id: collaborationId };
        if (dueDate) {
            deliverable.dueDate = new Date(dueDate);
        }
        return await this.deliverableRepository.save(deliverable);
    }
    async findAll() {
        return await this.deliverableRepository.find({
            relations: ['collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByCollaboration(collaborationId) {
        return await this.deliverableRepository.find({
            where: { collaboration: { id: collaborationId } },
            relations: ['collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByStatus(status) {
        return await this.deliverableRepository.find({
            where: { status },
            relations: ['collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOverdue() {
        const now = new Date();
        return await this.deliverableRepository
            .createQueryBuilder('deliverable')
            .leftJoinAndSelect('deliverable.collaboration', 'collaboration')
            .where('deliverable.dueDate < :now', { now })
            .andWhere('deliverable.status NOT IN (:...completedStatuses)', {
            completedStatuses: [deliverable_dto_1.DeliverableStatus.APPROVED, deliverable_dto_1.DeliverableStatus.REJECTED]
        })
            .orderBy('deliverable.dueDate', 'ASC')
            .getMany();
    }
    async findOne(id) {
        const deliverable = await this.deliverableRepository.findOne({
            where: { id },
            relations: ['collaboration'],
        });
        if (!deliverable) {
            throw new common_1.NotFoundException('Deliverable not found');
        }
        return deliverable;
    }
    async update(id, updateDeliverableDto) {
        const deliverable = await this.findOne(id);
        Object.assign(deliverable, updateDeliverableDto);
        if (updateDeliverableDto.dueDate) {
            deliverable.dueDate = new Date(updateDeliverableDto.dueDate);
        }
        return await this.deliverableRepository.save(deliverable);
    }
    async submit(id, submitDeliverableDto) {
        const deliverable = await this.findOne(id);
        if (deliverable.status !== deliverable_dto_1.DeliverableStatus.PENDING) {
            throw new common_1.BadRequestException('Deliverable must be in pending status to submit');
        }
        deliverable.contentUrl = submitDeliverableDto.contentUrl;
        deliverable.attachments = submitDeliverableDto.attachments || [];
        deliverable.metadata = { ...deliverable.metadata, ...submitDeliverableDto.metadata };
        deliverable.status = deliverable_dto_1.DeliverableStatus.SUBMITTED;
        deliverable.submittedAt = new Date();
        return await this.deliverableRepository.save(deliverable);
    }
    async review(id, reviewDeliverableDto) {
        const deliverable = await this.findOne(id);
        if (deliverable.status !== deliverable_dto_1.DeliverableStatus.SUBMITTED) {
            throw new common_1.BadRequestException('Deliverable must be submitted before it can be reviewed');
        }
        deliverable.status = reviewDeliverableDto.status;
        deliverable.feedback = reviewDeliverableDto.feedback;
        if (reviewDeliverableDto.status === deliverable_dto_1.DeliverableStatus.APPROVED) {
            deliverable.approvedAt = new Date();
        }
        else if (reviewDeliverableDto.status === deliverable_dto_1.DeliverableStatus.REVISION_REQUESTED) {
            deliverable.revisionCount += 1;
            deliverable.status = deliverable_dto_1.DeliverableStatus.PENDING;
        }
        return await this.deliverableRepository.save(deliverable);
    }
    async resubmit(id, submitDeliverableDto) {
        const deliverable = await this.findOne(id);
        if (deliverable.status !== deliverable_dto_1.DeliverableStatus.PENDING) {
            throw new common_1.BadRequestException('Deliverable must be in pending status to resubmit');
        }
        deliverable.contentUrl = submitDeliverableDto.contentUrl;
        deliverable.attachments = submitDeliverableDto.attachments || [];
        deliverable.metadata = { ...deliverable.metadata, ...submitDeliverableDto.metadata };
        deliverable.status = deliverable_dto_1.DeliverableStatus.SUBMITTED;
        deliverable.submittedAt = new Date();
        return await this.deliverableRepository.save(deliverable);
    }
    async remove(id) {
        const deliverable = await this.findOne(id);
        await this.deliverableRepository.remove(deliverable);
    }
    async getDeliverableStats(collaborationId) {
        const query = this.deliverableRepository.createQueryBuilder('deliverable');
        if (collaborationId) {
            query.where('deliverable.collaborationId = :collaborationId', { collaborationId });
        }
        const [total, pending, submitted, approved, rejected, revisionRequested] = await Promise.all([
            query.getCount(),
            query.clone().andWhere('deliverable.status = :status', { status: deliverable_dto_1.DeliverableStatus.PENDING }).getCount(),
            query.clone().andWhere('deliverable.status = :status', { status: deliverable_dto_1.DeliverableStatus.SUBMITTED }).getCount(),
            query.clone().andWhere('deliverable.status = :status', { status: deliverable_dto_1.DeliverableStatus.APPROVED }).getCount(),
            query.clone().andWhere('deliverable.status = :status', { status: deliverable_dto_1.DeliverableStatus.REJECTED }).getCount(),
            query.clone().andWhere('deliverable.status = :status', { status: deliverable_dto_1.DeliverableStatus.REVISION_REQUESTED }).getCount(),
        ]);
        return {
            total,
            pending,
            submitted,
            approved,
            rejected,
            revisionRequested,
            approvalRate: total > 0 ? (approved / total * 100).toFixed(2) : 0,
        };
    }
};
exports.DeliverableService = DeliverableService;
exports.DeliverableService = DeliverableService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(deliverable_entity_1.Deliverable)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DeliverableService);
//# sourceMappingURL=deliverables.service.js.map
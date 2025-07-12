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
exports.CollaborationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const collaboration_entity_1 = require("./entities/collaboration.entity");
const campaigns_service_1 = require("../campaigns/campaigns.service");
const proposals_service_1 = require("../proposals/proposals.service");
const enums_1 = require("../common/enums");
let CollaborationService = class CollaborationService {
    constructor(collaborationRepository, campaignService, proposalService) {
        this.collaborationRepository = collaborationRepository;
        this.campaignService = campaignService;
        this.proposalService = proposalService;
    }
    async create(createCollaborationDto) {
        const campaign = await this.campaignService.findOne(createCollaborationDto.campaignId);
        const proposal = await this.proposalService.findOne(createCollaborationDto.proposalId);
        if (proposal.status !== enums_1.ProposalStatus.ACCEPTED) {
            throw new common_1.ConflictException('Proposal must be accepted to create collaboration');
        }
        const existingCollaboration = await this.collaborationRepository.findOne({
            where: { proposal: { id: proposal.id } },
        });
        if (existingCollaboration) {
            throw new common_1.ConflictException('Collaboration already exists for this proposal');
        }
        const collaboration = this.collaborationRepository.create({
            ...createCollaborationDto,
            startDate: new Date(createCollaborationDto.startDate),
            endDate: new Date(createCollaborationDto.endDate),
            campaign,
            proposal,
        });
        return await this.collaborationRepository.save(collaboration);
    }
    async findAll() {
        return await this.collaborationRepository.find({
            relations: ['campaign', 'proposal', 'contract', 'deliverables', 'reviews'],
        });
    }
    async findOne(id) {
        const collaboration = await this.collaborationRepository.findOne({
            where: { id },
            relations: ['campaign', 'proposal', 'contract', 'deliverables', 'reviews'],
        });
        if (!collaboration) {
            throw new common_1.NotFoundException(`Collaboration with ID ${id} not found`);
        }
        return collaboration;
    }
    async findByCreator(userId) {
        return await this.collaborationRepository
            .createQueryBuilder('collaboration')
            .leftJoinAndSelect('collaboration.campaign', 'campaign')
            .leftJoinAndSelect('collaboration.proposal', 'proposal')
            .leftJoinAndSelect('proposal.creatorProfile', 'creatorProfile')
            .leftJoinAndSelect('creatorProfile.user', 'user')
            .leftJoinAndSelect('collaboration.contract', 'contract')
            .leftJoinAndSelect('collaboration.deliverables', 'deliverables')
            .where('user.id = :userId', { userId })
            .getMany();
    }
    async findByBrand(userId) {
        return await this.collaborationRepository
            .createQueryBuilder('collaboration')
            .leftJoinAndSelect('collaboration.campaign', 'campaign')
            .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
            .leftJoinAndSelect('brandProfile.user', 'user')
            .leftJoinAndSelect('collaboration.proposal', 'proposal')
            .leftJoinAndSelect('collaboration.contract', 'contract')
            .leftJoinAndSelect('collaboration.deliverables', 'deliverables')
            .where('user.id = :userId', { userId })
            .getMany();
    }
    async update(id, updateCollaborationDto) {
        const collaboration = await this.findOne(id);
        const updateData = { ...updateCollaborationDto };
        if (updateCollaborationDto.startDate) {
            updateData.startDate = new Date(updateCollaborationDto.startDate);
        }
        if (updateCollaborationDto.endDate) {
            updateData.endDate = new Date(updateCollaborationDto.endDate);
        }
        Object.assign(collaboration, updateData);
        return await this.collaborationRepository.save(collaboration);
    }
    async remove(id) {
        const collaboration = await this.findOne(id);
        await this.collaborationRepository.remove(collaboration);
    }
    async findByStatus(status) {
        return await this.collaborationRepository.find({
            where: { status },
            relations: ['campaign', 'proposal'],
        });
    }
    async completeCollaboration(id) {
        return await this.update(id, {
            status: enums_1.CollaborationStatus.COMPLETED,
            isCompleted: true,
            progress: 1.0,
        });
    }
    async updateProgress(id, progress) {
        return await this.update(id, { progress });
    }
};
exports.CollaborationService = CollaborationService;
exports.CollaborationService = CollaborationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(collaboration_entity_1.Collaboration)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        campaigns_service_1.CampaignService,
        proposals_service_1.ProposalService])
], CollaborationService);
//# sourceMappingURL=collaborations.service.js.map
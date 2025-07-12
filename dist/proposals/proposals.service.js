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
exports.ProposalService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const proposal_entity_1 = require("./entities/proposal.entity");
const creator_profile_service_1 = require("../creator-profile/creator-profile.service");
const campaigns_service_1 = require("../campaigns/campaigns.service");
const enums_1 = require("../common/enums");
let ProposalService = class ProposalService {
    constructor(proposalRepository, creatorProfileService, campaignService) {
        this.proposalRepository = proposalRepository;
        this.creatorProfileService = creatorProfileService;
        this.campaignService = campaignService;
    }
    async create(userId, createProposalDto) {
        const creatorProfile = await this.creatorProfileService.findByUserId(userId);
        if (!creatorProfile) {
            throw new common_1.ForbiddenException('Creator profile required to create proposals');
        }
        const campaign = await this.campaignService.findOne(createProposalDto.campaignId);
        const existingProposal = await this.proposalRepository.findOne({
            where: {
                creatorProfile: { id: creatorProfile.id },
                campaign: { id: campaign.id },
            },
        });
        if (existingProposal) {
            throw new common_1.ForbiddenException('Proposal already exists for this campaign');
        }
        const proposalData = { ...createProposalDto };
        if (createProposalDto.proposedStartDate) {
            proposalData.proposedStartDate = new Date(createProposalDto.proposedStartDate);
        }
        if (createProposalDto.proposedEndDate) {
            proposalData.proposedEndDate = new Date(createProposalDto.proposedEndDate);
        }
        const proposal = this.proposalRepository.create({
            ...proposalData,
            creatorProfile,
            campaign,
        });
        return await this.proposalRepository.save(proposal);
    }
    async findAll() {
        return await this.proposalRepository.find({
            relations: ['creatorProfile', 'campaign', 'collaboration'],
        });
    }
    async findOne(id) {
        const proposal = await this.proposalRepository.findOne({
            where: { id },
            relations: ['creatorProfile', 'campaign', 'collaboration'],
        });
        if (!proposal) {
            throw new common_1.NotFoundException(`Proposal with ID ${id} not found`);
        }
        return proposal;
    }
    async findByCampaign(campaignId) {
        return await this.proposalRepository.find({
            where: { campaign: { id: campaignId } },
            relations: ['creatorProfile', 'campaign'],
        });
    }
    async findByCreator(userId) {
        const creatorProfile = await this.creatorProfileService.findByUserId(userId);
        if (!creatorProfile) {
            return [];
        }
        return await this.proposalRepository.find({
            where: { creatorProfile: { id: creatorProfile.id } },
            relations: ['campaign', 'collaboration'],
        });
    }
    async findByBrand(userId) {
        return await this.proposalRepository
            .createQueryBuilder('proposal')
            .leftJoinAndSelect('proposal.creatorProfile', 'creatorProfile')
            .leftJoinAndSelect('proposal.campaign', 'campaign')
            .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
            .leftJoinAndSelect('brandProfile.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }
    async update(id, updateProposalDto) {
        const proposal = await this.findOne(id);
        const updateData = { ...updateProposalDto };
        if (updateProposalDto.proposedStartDate) {
            updateData.proposedStartDate = new Date(updateProposalDto.proposedStartDate);
        }
        if (updateProposalDto.proposedEndDate) {
            updateData.proposedEndDate = new Date(updateProposalDto.proposedEndDate);
        }
        Object.assign(proposal, updateData);
        return await this.proposalRepository.save(proposal);
    }
    async remove(id) {
        const proposal = await this.findOne(id);
        await this.proposalRepository.remove(proposal);
    }
    async acceptProposal(id) {
        return await this.update(id, { status: enums_1.ProposalStatus.ACCEPTED });
    }
    async rejectProposal(id, rejectionReason) {
        return await this.update(id, {
            status: enums_1.ProposalStatus.REJECTED,
            rejectionReason,
        });
    }
    async findByStatus(status) {
        return await this.proposalRepository.find({
            where: { status },
            relations: ['creatorProfile', 'campaign'],
        });
    }
};
exports.ProposalService = ProposalService;
exports.ProposalService = ProposalService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(proposal_entity_1.Proposal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        creator_profile_service_1.CreatorProfileService,
        campaigns_service_1.CampaignService])
], ProposalService);
//# sourceMappingURL=proposals.service.js.map
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
exports.CampaignService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const campaign_entity_1 = require("./entities/campaign.entity");
const brand_profile_service_1 = require("../brand-profile/brand-profile.service");
let CampaignService = class CampaignService {
    constructor(campaignRepository, brandProfileService) {
        this.campaignRepository = campaignRepository;
        this.brandProfileService = brandProfileService;
    }
    async create(userId, createCampaignDto) {
        const brandProfile = await this.brandProfileService.findByUserId(userId);
        if (!brandProfile) {
            throw new common_1.ForbiddenException('Brand profile required to create campaigns');
        }
        const campaign = this.campaignRepository.create({
            ...createCampaignDto,
            startDate: new Date(createCampaignDto.startDate),
            endDate: new Date(createCampaignDto.endDate),
            brandProfile,
        });
        return await this.campaignRepository.save(campaign);
    }
    async findAll() {
        return await this.campaignRepository.find({
            relations: ['brandProfile', 'proposals', 'collaborations'],
            where: { isActive: true },
        });
    }
    async findOne(id) {
        const campaign = await this.campaignRepository.findOne({
            where: { id },
            relations: ['brandProfile', 'proposals', 'collaborations'],
        });
        if (!campaign) {
            throw new common_1.NotFoundException(`Campaign with ID ${id} not found`);
        }
        return campaign;
    }
    async findByBrandProfile(brandProfileId) {
        return await this.campaignRepository.find({
            where: { brandProfile: { id: brandProfileId } },
            relations: ['proposals', 'collaborations'],
        });
    }
    async findByUserId(userId) {
        const brandProfile = await this.brandProfileService.findByUserId(userId);
        if (!brandProfile) {
            return [];
        }
        return await this.findByBrandProfile(brandProfile.id);
    }
    async update(id, updateCampaignDto) {
        const campaign = await this.findOne(id);
        const updateData = { ...updateCampaignDto };
        if (updateCampaignDto.startDate) {
            updateData.startDate = new Date(updateCampaignDto.startDate);
        }
        if (updateCampaignDto.endDate) {
            updateData.endDate = new Date(updateCampaignDto.endDate);
        }
        Object.assign(campaign, updateData);
        return await this.campaignRepository.save(campaign);
    }
    async remove(id) {
        const campaign = await this.findOne(id);
        await this.campaignRepository.remove(campaign);
    }
    async findFeatured() {
        return await this.campaignRepository.find({
            where: { isFeatured: true, isActive: true },
            relations: ['brandProfile'],
        });
    }
    async findByPlatform(platform) {
        return await this.campaignRepository
            .createQueryBuilder('campaign')
            .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
            .where(':platform = ANY(campaign.platforms)', { platform })
            .andWhere('campaign.isActive = :isActive', { isActive: true })
            .getMany();
    }
    async searchCampaigns(filters) {
        const query = this.campaignRepository
            .createQueryBuilder('campaign')
            .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
            .where('campaign.isActive = :isActive', { isActive: true });
        if (filters.budget?.min) {
            query.andWhere('campaign.budget >= :minBudget', { minBudget: filters.budget.min });
        }
        if (filters.budget?.max) {
            query.andWhere('campaign.budget <= :maxBudget', { maxBudget: filters.budget.max });
        }
        if (filters.platforms?.length) {
            query.andWhere('campaign.platforms && :platforms', { platforms: filters.platforms });
        }
        if (filters.niches?.length) {
            query.andWhere('campaign.requirements->>\'niches\' && :niches', { niches: filters.niches });
        }
        return await query.getMany();
    }
};
exports.CampaignService = CampaignService;
exports.CampaignService = CampaignService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(campaign_entity_1.Campaign)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        brand_profile_service_1.BrandProfileService])
], CampaignService);
//# sourceMappingURL=campaigns.service.js.map
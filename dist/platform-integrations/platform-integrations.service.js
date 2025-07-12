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
exports.PlatformIntegrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const platform_integration_entity_1 = require("./entities/platform-integration.entity");
let PlatformIntegrationService = class PlatformIntegrationService {
    constructor(platformIntegrationRepository) {
        this.platformIntegrationRepository = platformIntegrationRepository;
    }
    async create(creatorProfileId, createPlatformIntegrationDto) {
        const existingIntegration = await this.platformIntegrationRepository.findOne({
            where: {
                creatorProfile: { id: creatorProfileId },
                platform: createPlatformIntegrationDto.platform,
            },
        });
        if (existingIntegration) {
            throw new common_1.BadRequestException(`Integration for ${createPlatformIntegrationDto.platform} already exists`);
        }
        const integration = this.platformIntegrationRepository.create({
            ...createPlatformIntegrationDto,
            creatorProfile: { id: creatorProfileId },
            syncStatus: 'disconnected',
        });
        return await this.platformIntegrationRepository.save(integration);
    }
    async findAll() {
        return await this.platformIntegrationRepository.find({
            relations: ['creatorProfile'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByCreatorProfile(creatorProfileId) {
        return await this.platformIntegrationRepository.find({
            where: { creatorProfile: { id: creatorProfileId } },
            order: { platform: 'ASC' },
        });
    }
    async findByPlatform(platform) {
        return await this.platformIntegrationRepository.find({
            where: { platform },
            relations: ['creatorProfile'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const integration = await this.platformIntegrationRepository.findOne({
            where: { id },
            relations: ['creatorProfile'],
        });
        if (!integration) {
            throw new common_1.NotFoundException(`Platform integration with ID ${id} not found`);
        }
        return integration;
    }
    async update(id, updatePlatformIntegrationDto) {
        const integration = await this.findOne(id);
        Object.assign(integration, updatePlatformIntegrationDto);
        return await this.platformIntegrationRepository.save(integration);
    }
    async remove(id) {
        const integration = await this.findOne(id);
        await this.platformIntegrationRepository.remove(integration);
    }
    async connect(id, authData) {
        const integration = await this.findOne(id);
        integration.authToken = authData.authToken;
        integration.refreshToken = authData.refreshToken;
        integration.platformUserId = authData.platformUserId;
        integration.platformUsername = authData.platformUsername;
        integration.syncStatus = 'connected';
        integration.tokenExpiresAt = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
        return await this.platformIntegrationRepository.save(integration);
    }
    async disconnect(id) {
        const integration = await this.findOne(id);
        integration.authToken = null;
        integration.refreshToken = null;
        integration.platformUserId = null;
        integration.platformUsername = null;
        integration.syncStatus = 'disconnected';
        integration.tokenExpiresAt = null;
        integration.platformData = null;
        return await this.platformIntegrationRepository.save(integration);
    }
    async syncPlatformData(id) {
        const integration = await this.findOne(id);
        if (integration.syncStatus !== 'connected' || !integration.authToken) {
            throw new common_1.BadRequestException('Platform integration is not connected');
        }
        try {
            integration.syncStatus = 'syncing';
            await this.platformIntegrationRepository.save(integration);
            const syncedData = await this.fetchPlatformData(integration);
            integration.platformData = syncedData;
            integration.lastSyncAt = new Date();
            integration.syncStatus = 'connected';
            integration.errorMessage = null;
            return await this.platformIntegrationRepository.save(integration);
        }
        catch (error) {
            integration.syncStatus = 'error';
            integration.errorMessage = error.message;
            await this.platformIntegrationRepository.save(integration);
            throw error;
        }
    }
    async fetchPlatformData(integration) {
        const platformData = {
            profileUrl: `https://${integration.platform}.com/${integration.platformUsername}`,
            followerCount: Math.floor(Math.random() * 100000) + 1000,
            followingCount: Math.floor(Math.random() * 1000) + 100,
            postCount: Math.floor(Math.random() * 500) + 50,
            engagementRate: (Math.random() * 10 + 1).toFixed(2),
            bio: `${integration.platform} content creator`,
            isVerified: Math.random() > 0.8,
            avgLikes: Math.floor(Math.random() * 10000) + 100,
            avgComments: Math.floor(Math.random() * 500) + 10,
            topHashtags: ['#content', '#creator', '#lifestyle'],
        };
        return platformData;
    }
    async getIntegrationStats(creatorProfileId) {
        const integrations = await this.findByCreatorProfile(creatorProfileId);
        const stats = {
            totalIntegrations: integrations.length,
            connectedIntegrations: integrations.filter(i => i.syncStatus === 'connected').length,
            disconnectedIntegrations: integrations.filter(i => i.syncStatus === 'disconnected').length,
            errorIntegrations: integrations.filter(i => i.syncStatus === 'error').length,
            platforms: integrations.map(i => i.platform),
            totalFollowers: integrations.reduce((sum, i) => sum + (i.platformData?.followerCount || 0), 0),
            averageEngagement: integrations.reduce((sum, i) => sum + parseFloat(i.platformData?.engagementRate || '0'), 0) / integrations.length || 0,
        };
        return stats;
    }
};
exports.PlatformIntegrationService = PlatformIntegrationService;
exports.PlatformIntegrationService = PlatformIntegrationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(platform_integration_entity_1.PlatformIntegration)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlatformIntegrationService);
//# sourceMappingURL=platform-integrations.service.js.map
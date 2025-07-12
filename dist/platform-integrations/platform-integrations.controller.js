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
exports.PlatformIntegrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_integrations_service_1 = require("./platform-integrations.service");
const platform_integration_dto_1 = require("./dto/platform-integration.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const enums_1 = require("../common/enums");
let PlatformIntegrationController = class PlatformIntegrationController {
    constructor(platformIntegrationService) {
        this.platformIntegrationService = platformIntegrationService;
    }
    async create(req, createPlatformIntegrationDto) {
        return await this.platformIntegrationService.create(req.user.creatorProfileId, createPlatformIntegrationDto);
    }
    async findAll() {
        return await this.platformIntegrationService.findAll();
    }
    async findMyIntegrations(req) {
        return await this.platformIntegrationService.findByCreatorProfile(req.user.creatorProfileId);
    }
    async findByPlatform(platform) {
        return await this.platformIntegrationService.findByPlatform(platform);
    }
    async getStats(req) {
        return await this.platformIntegrationService.getIntegrationStats(req.user.creatorProfileId);
    }
    async findOne(id) {
        return await this.platformIntegrationService.findOne(id);
    }
    async update(id, updatePlatformIntegrationDto) {
        return await this.platformIntegrationService.update(id, updatePlatformIntegrationDto);
    }
    async connect(id, connectPlatformDto) {
        return await this.platformIntegrationService.connect(id, connectPlatformDto);
    }
    async disconnect(id) {
        return await this.platformIntegrationService.disconnect(id);
    }
    async sync(id) {
        return await this.platformIntegrationService.syncPlatformData(id);
    }
    async remove(id) {
        await this.platformIntegrationService.remove(id);
        return { message: 'Platform integration deleted successfully' };
    }
};
exports.PlatformIntegrationController = PlatformIntegrationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new platform integration' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Platform integration created successfully', type: platform_integration_dto_1.PlatformIntegrationResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, platform_integration_dto_1.CreatePlatformIntegrationDto]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all platform integrations (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all platform integrations', type: [platform_integration_dto_1.PlatformIntegrationResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-integrations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user platform integrations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved user platform integrations', type: [platform_integration_dto_1.PlatformIntegrationResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "findMyIntegrations", null);
__decorate([
    (0, common_1.Get)('platform/:platform'),
    (0, swagger_1.ApiOperation)({ summary: 'Get integrations by platform' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved platform integrations', type: [platform_integration_dto_1.PlatformIntegrationResponseDto] }),
    __param(0, (0, common_1.Param)('platform')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "findByPlatform", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get platform integration statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved integration stats', type: platform_integration_dto_1.PlatformStatsDto }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific platform integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved platform integration', type: platform_integration_dto_1.PlatformIntegrationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a platform integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Platform integration updated successfully', type: platform_integration_dto_1.PlatformIntegrationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, platform_integration_dto_1.UpdatePlatformIntegrationDto]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/connect'),
    (0, swagger_1.ApiOperation)({ summary: 'Connect a platform integration with OAuth tokens' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Platform connected successfully', type: platform_integration_dto_1.PlatformIntegrationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, platform_integration_dto_1.ConnectPlatformDto]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "connect", null);
__decorate([
    (0, common_1.Post)(':id/disconnect'),
    (0, swagger_1.ApiOperation)({ summary: 'Disconnect a platform integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Platform disconnected successfully', type: platform_integration_dto_1.PlatformIntegrationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "disconnect", null);
__decorate([
    (0, common_1.Post)(':id/sync'),
    (0, swagger_1.ApiOperation)({ summary: 'Sync platform data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Platform data synced successfully', type: platform_integration_dto_1.PlatformIntegrationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "sync", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a platform integration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Platform integration deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PlatformIntegrationController.prototype, "remove", null);
exports.PlatformIntegrationController = PlatformIntegrationController = __decorate([
    (0, swagger_1.ApiTags)('platform-integrations'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('platform-integrations'),
    __metadata("design:paramtypes", [platform_integrations_service_1.PlatformIntegrationService])
], PlatformIntegrationController);
//# sourceMappingURL=platform-integrations.controller.js.map
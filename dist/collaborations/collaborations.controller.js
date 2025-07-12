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
exports.CollaborationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const collaborations_service_1 = require("./collaborations.service");
const collaboration_dto_1 = require("./dto/collaboration.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let CollaborationController = class CollaborationController {
    constructor(collaborationService) {
        this.collaborationService = collaborationService;
    }
    async create(createCollaborationDto) {
        return await this.collaborationService.create(createCollaborationDto);
    }
    async findAll() {
        return await this.collaborationService.findAll();
    }
    async findMyCollaborations(req) {
        if (req.user.role === enums_1.UserRole.CREATOR) {
            return await this.collaborationService.findByCreator(req.user.id);
        }
        else {
            return await this.collaborationService.findByBrand(req.user.id);
        }
    }
    async findByStatus(status) {
        return await this.collaborationService.findByStatus(status);
    }
    async findOne(id) {
        return await this.collaborationService.findOne(id);
    }
    async update(id, updateCollaborationDto) {
        return await this.collaborationService.update(id, updateCollaborationDto);
    }
    async completeCollaboration(id) {
        return await this.collaborationService.completeCollaboration(id);
    }
    async updateProgress(id, body) {
        return await this.collaborationService.updateProgress(id, body.progress);
    }
    async remove(id) {
        await this.collaborationService.remove(id);
        return { message: 'Collaboration deleted successfully' };
    }
};
exports.CollaborationController = CollaborationController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new collaboration' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Collaboration created successfully',
        type: collaboration_dto_1.CollaborationResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [collaboration_dto_1.CreateCollaborationDto]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all collaborations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of collaborations',
        type: [collaboration_dto_1.CollaborationResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-collaborations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user collaborations' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of user collaborations',
        type: [collaboration_dto_1.CollaborationResponseDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "findMyCollaborations", null);
__decorate([
    (0, common_1.Get)('by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get collaborations by status' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: enums_1.CollaborationStatus }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Collaborations filtered by status',
        type: [collaboration_dto_1.CollaborationResponseDto],
    }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get collaboration by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Collaboration ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Collaboration found',
        type: collaboration_dto_1.CollaborationResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update collaboration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Collaboration ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Collaboration updated successfully',
        type: collaboration_dto_1.CollaborationResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, collaboration_dto_1.UpdateCollaborationDto]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark collaboration as completed' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Collaboration ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Collaboration completed successfully',
        type: collaboration_dto_1.CollaborationResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "completeCollaboration", null);
__decorate([
    (0, common_1.Patch)(':id/progress'),
    (0, swagger_1.ApiOperation)({ summary: 'Update collaboration progress' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Collaboration ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Progress updated successfully',
        type: collaboration_dto_1.CollaborationResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "updateProgress", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete collaboration' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Collaboration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Collaboration deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CollaborationController.prototype, "remove", null);
exports.CollaborationController = CollaborationController = __decorate([
    (0, swagger_1.ApiTags)('collaborations'),
    (0, common_1.Controller)('collaborations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [collaborations_service_1.CollaborationService])
], CollaborationController);
//# sourceMappingURL=collaborations.controller.js.map
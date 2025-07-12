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
exports.DeliverableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const deliverables_service_1 = require("./deliverables.service");
const deliverable_dto_1 = require("./dto/deliverable.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let DeliverableController = class DeliverableController {
    constructor(deliverableService) {
        this.deliverableService = deliverableService;
    }
    async create(createDeliverableDto) {
        return await this.deliverableService.create(createDeliverableDto);
    }
    async findAll() {
        return await this.deliverableService.findAll();
    }
    async findByCollaboration(collaborationId) {
        return await this.deliverableService.findByCollaboration(collaborationId);
    }
    async findByStatus(status) {
        return await this.deliverableService.findByStatus(status);
    }
    async findOverdue() {
        return await this.deliverableService.findOverdue();
    }
    async getStats(collaborationId) {
        return await this.deliverableService.getDeliverableStats(collaborationId);
    }
    async findOne(id) {
        return await this.deliverableService.findOne(id);
    }
    async update(id, updateDeliverableDto) {
        return await this.deliverableService.update(id, updateDeliverableDto);
    }
    async submit(id, submitDeliverableDto) {
        return await this.deliverableService.submit(id, submitDeliverableDto);
    }
    async review(id, reviewDeliverableDto) {
        return await this.deliverableService.review(id, reviewDeliverableDto);
    }
    async resubmit(id, submitDeliverableDto) {
        return await this.deliverableService.resubmit(id, submitDeliverableDto);
    }
    async remove(id) {
        await this.deliverableService.remove(id);
        return { message: 'Deliverable deleted successfully' };
    }
};
exports.DeliverableController = DeliverableController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new deliverable (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Deliverable created successfully', type: deliverable_dto_1.DeliverableResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [deliverable_dto_1.CreateDeliverableDto]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all deliverables' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all deliverables', type: [deliverable_dto_1.DeliverableResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('collaboration/:collaborationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get deliverables by collaboration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved deliverables for collaboration', type: [deliverable_dto_1.DeliverableResponseDto] }),
    __param(0, (0, common_1.Param)('collaborationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "findByCollaboration", null);
__decorate([
    (0, common_1.Get)('by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get deliverables by status' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: deliverable_dto_1.DeliverableStatus, description: 'Deliverable status to filter by' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved deliverables by status', type: [deliverable_dto_1.DeliverableResponseDto] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, swagger_1.ApiOperation)({ summary: 'Get overdue deliverables' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved overdue deliverables', type: [deliverable_dto_1.DeliverableResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "findOverdue", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get deliverable statistics' }),
    (0, swagger_1.ApiQuery)({ name: 'collaborationId', required: false, description: 'Filter stats by collaboration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved deliverable statistics' }),
    __param(0, (0, common_1.Query)('collaborationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific deliverable' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved deliverable', type: deliverable_dto_1.DeliverableResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a deliverable' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deliverable updated successfully', type: deliverable_dto_1.DeliverableResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deliverable_dto_1.UpdateDeliverableDto]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/submit'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, swagger_1.ApiOperation)({ summary: 'Submit a deliverable (Creator only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deliverable submitted successfully', type: deliverable_dto_1.DeliverableResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deliverable_dto_1.SubmitDeliverableDto]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "submit", null);
__decorate([
    (0, common_1.Patch)(':id/review'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Review a deliverable (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deliverable reviewed successfully', type: deliverable_dto_1.DeliverableResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deliverable_dto_1.ReviewDeliverableDto]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "review", null);
__decorate([
    (0, common_1.Patch)(':id/resubmit'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, swagger_1.ApiOperation)({ summary: 'Resubmit a deliverable after revision (Creator only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deliverable resubmitted successfully', type: deliverable_dto_1.DeliverableResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, deliverable_dto_1.SubmitDeliverableDto]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "resubmit", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a deliverable (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Deliverable deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DeliverableController.prototype, "remove", null);
exports.DeliverableController = DeliverableController = __decorate([
    (0, swagger_1.ApiTags)('deliverables'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('deliverables'),
    __metadata("design:paramtypes", [deliverables_service_1.DeliverableService])
], DeliverableController);
//# sourceMappingURL=deliverables.controller.js.map
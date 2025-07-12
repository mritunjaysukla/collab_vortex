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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contracts_service_1 = require("./contracts.service");
const contract_dto_1 = require("./dto/contract.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let ContractController = class ContractController {
    constructor(contractService) {
        this.contractService = contractService;
    }
    async create(createContractDto) {
        return await this.contractService.create(createContractDto);
    }
    async findAll() {
        return await this.contractService.findAll();
    }
    async findByStatus(status) {
        return await this.contractService.findByStatus(status);
    }
    async findByCollaboration(collaborationId) {
        return await this.contractService.findByCollaboration(collaborationId);
    }
    async findOne(id) {
        return await this.contractService.findOne(id);
    }
    async update(id, updateContractDto) {
        return await this.contractService.update(id, updateContractDto);
    }
    async signContract(id, signatureDto, req) {
        const userRole = req.user.role;
        return await this.contractService.signContract(id, signatureDto.signature, userRole);
    }
    async approve(id) {
        return await this.contractService.approve(id);
    }
    async complete(id) {
        return await this.contractService.complete(id);
    }
    async cancel(id) {
        return await this.contractService.cancel(id);
    }
    async remove(id) {
        await this.contractService.remove(id);
        return { message: 'Contract deleted successfully' };
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new contract (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Contract created successfully', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Get all contracts (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all contracts', type: [contract_dto_1.ContractResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contracts by status' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: contract_dto_1.ContractStatus, description: 'Contract status to filter by' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved contracts by status', type: [contract_dto_1.ContractResponseDto] }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)('collaboration/:collaborationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get contract by collaboration ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved contract for collaboration', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('collaborationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findByCollaboration", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific contract' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved contract', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a contract' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contract updated successfully', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contract_dto_1.UpdateContractDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/sign'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign a contract' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contract signed successfully', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "signContract", null);
__decorate([
    (0, common_1.Patch)(':id/approve'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Approve a contract (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contract approved successfully', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "approve", null);
__decorate([
    (0, common_1.Patch)(':id/complete'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark contract as completed' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contract marked as completed', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "complete", null);
__decorate([
    (0, common_1.Patch)(':id/cancel'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel a contract (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contract cancelled successfully', type: contract_dto_1.ContractResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "cancel", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a contract (Brand only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Contract deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "remove", null);
exports.ContractController = ContractController = __decorate([
    (0, swagger_1.ApiTags)('contracts'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('contracts'),
    __metadata("design:paramtypes", [contracts_service_1.ContractService])
], ContractController);
//# sourceMappingURL=contracts.controller.js.map
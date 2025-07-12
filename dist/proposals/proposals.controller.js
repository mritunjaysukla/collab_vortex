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
exports.ProposalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const proposals_service_1 = require("./proposals.service");
const proposal_dto_1 = require("./dto/proposal.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const enums_1 = require("../common/enums");
let ProposalController = class ProposalController {
    constructor(proposalService) {
        this.proposalService = proposalService;
    }
    async create(req, createProposalDto) {
        return await this.proposalService.create(req.user.id, createProposalDto);
    }
    async findAll() {
        return await this.proposalService.findAll();
    }
    async findMyProposals(req) {
        return await this.proposalService.findByCreator(req.user.id);
    }
    async findBrandProposals(req) {
        return await this.proposalService.findByBrand(req.user.id);
    }
    async findByStatus(status) {
        return await this.proposalService.findByStatus(status);
    }
    async findByCampaign(campaignId) {
        return await this.proposalService.findByCampaign(campaignId);
    }
    async findOne(id) {
        return await this.proposalService.findOne(id);
    }
    async update(id, updateProposalDto) {
        return await this.proposalService.update(id, updateProposalDto);
    }
    async acceptProposal(id) {
        return await this.proposalService.acceptProposal(id);
    }
    async rejectProposal(id, body) {
        return await this.proposalService.rejectProposal(id, body.rejectionReason);
    }
    async remove(id) {
        await this.proposalService.remove(id);
        return { message: 'Proposal deleted successfully' };
    }
};
exports.ProposalController = ProposalController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new proposal' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Proposal created successfully',
        type: proposal_dto_1.ProposalResponseDto,
    }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, proposal_dto_1.CreateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all proposals' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of proposals',
        type: [proposal_dto_1.ProposalResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-proposals'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get current creator proposals' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of creator proposals',
        type: [proposal_dto_1.ProposalResponseDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findMyProposals", null);
__decorate([
    (0, common_1.Get)('brand-proposals'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Get proposals for brand campaigns' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of proposals for brand campaigns',
        type: [proposal_dto_1.ProposalResponseDto],
    }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findBrandProposals", null);
__decorate([
    (0, common_1.Get)('by-status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get proposals by status' }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: enums_1.ProposalStatus }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Proposals filtered by status',
        type: [proposal_dto_1.ProposalResponseDto],
    }),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findByStatus", null);
__decorate([
    (0, common_1.Get)('campaign/:campaignId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get proposals for a specific campaign' }),
    (0, swagger_1.ApiParam)({ name: 'campaignId', description: 'Campaign ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Proposals for the campaign',
        type: [proposal_dto_1.ProposalResponseDto],
    }),
    __param(0, (0, common_1.Param)('campaignId', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findByCampaign", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get proposal by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Proposal ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Proposal found',
        type: proposal_dto_1.ProposalResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update proposal' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Proposal ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Proposal updated successfully',
        type: proposal_dto_1.ProposalResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposal_dto_1.UpdateProposalDto]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/accept'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Accept proposal' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Proposal ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Proposal accepted successfully',
        type: proposal_dto_1.ProposalResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "acceptProposal", null);
__decorate([
    (0, common_1.Patch)(':id/reject'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.BRAND),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Reject proposal' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Proposal ID' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Proposal rejected successfully',
        type: proposal_dto_1.ProposalResponseDto,
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "rejectProposal", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(enums_1.UserRole.CREATOR),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Delete proposal' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Proposal ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Proposal deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalController.prototype, "remove", null);
exports.ProposalController = ProposalController = __decorate([
    (0, swagger_1.ApiTags)('proposals'),
    (0, common_1.Controller)('proposals'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    __metadata("design:paramtypes", [proposals_service_1.ProposalService])
], ProposalController);
//# sourceMappingURL=proposals.controller.js.map
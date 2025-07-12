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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payments_service_1 = require("./payments.service");
const payment_dto_1 = require("./dto/payment.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async create(createPaymentDto) {
        return await this.paymentService.create(createPaymentDto);
    }
    async findAll() {
        return await this.paymentService.findAll();
    }
    async findMyPayments(req) {
        return await this.paymentService.findByUser(req.user.id);
    }
    async findOutgoingPayments(req) {
        return await this.paymentService.findByPayer(req.user.id);
    }
    async findIncomingPayments(req) {
        return await this.paymentService.findByPayee(req.user.id);
    }
    async findByCollaboration(collaborationId) {
        return await this.paymentService.findByCollaboration(collaborationId);
    }
    async getStats(req, userId) {
        const targetUserId = userId && req.user.role === 'admin' ? userId : req.user.id;
        return await this.paymentService.getPaymentStats(targetUserId);
    }
    async getMonthlyRevenue(req, userId) {
        const targetUserId = userId && req.user.role === 'admin' ? userId : req.user.id;
        return await this.paymentService.getMonthlyRevenue(targetUserId);
    }
    async findOne(id) {
        return await this.paymentService.findOne(id);
    }
    async update(id, updatePaymentDto) {
        return await this.paymentService.update(id, updatePaymentDto);
    }
    async processPayment(id, processPaymentDto) {
        return await this.paymentService.processPayment(id, processPaymentDto);
    }
    async requestRefund(id, body) {
        return await this.paymentService.requestRefund(id, body.reason);
    }
    async remove(id) {
        await this.paymentService.remove(id);
        return { message: 'Payment deleted successfully' };
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payment' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Payment created successfully', type: payment_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all payments (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all payments', type: [payment_dto_1.PaymentResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('my-payments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current user payments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved user payments', type: [payment_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findMyPayments", null);
__decorate([
    (0, common_1.Get)('outgoing'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments made by current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved outgoing payments', type: [payment_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findOutgoingPayments", null);
__decorate([
    (0, common_1.Get)('incoming'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments received by current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved incoming payments', type: [payment_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findIncomingPayments", null);
__decorate([
    (0, common_1.Get)('collaboration/:collaborationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payments for a collaboration' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved collaboration payments', type: [payment_dto_1.PaymentResponseDto] }),
    __param(0, (0, common_1.Param)('collaborationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findByCollaboration", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payment statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved payment stats', type: payment_dto_1.PaymentStatsDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)('revenue/monthly'),
    (0, swagger_1.ApiOperation)({ summary: 'Get monthly revenue data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved monthly revenue', type: [payment_dto_1.MonthlyRevenueDto] }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getMonthlyRevenue", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved payment', type: payment_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment updated successfully', type: payment_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/process'),
    (0, swagger_1.ApiOperation)({ summary: 'Process a pending payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment processed successfully', type: payment_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, payment_dto_1.ProcessPaymentDto]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "processPayment", null);
__decorate([
    (0, common_1.Post)(':id/refund'),
    (0, swagger_1.ApiOperation)({ summary: 'Request a refund for a payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Refund processed successfully', type: payment_dto_1.PaymentResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "requestRefund", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a payment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Payment deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "remove", null);
exports.PaymentController = PaymentController = __decorate([
    (0, swagger_1.ApiTags)('payments'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [payments_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payments.controller.js.map
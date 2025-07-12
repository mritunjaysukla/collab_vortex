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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthlyRevenueDto = exports.PaymentStatsDto = exports.PaymentResponseDto = exports.ProcessPaymentDto = exports.UpdatePaymentDto = exports.CreatePaymentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class CreatePaymentDto {
    constructor() {
        this.currency = 'USD';
    }
}
exports.CreatePaymentDto = CreatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-collaboration-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "collaborationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-payer-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "payerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-payee-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "payeeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000, minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreatePaymentDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment for Instagram campaign deliverable' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePaymentDto.prototype, "currency", void 0);
class UpdatePaymentDto extends (0, swagger_1.PartialType)(CreatePaymentDto) {
}
exports.UpdatePaymentDto = UpdatePaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.PaymentStatus, required: false }),
    (0, class_validator_1.IsEnum)(enums_1.PaymentStatus),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'txn_1234567890', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdatePaymentDto.prototype, "transactionId", void 0);
class ProcessPaymentDto {
}
exports.ProcessPaymentDto = ProcessPaymentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'card_1234567890' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProcessPaymentDto.prototype, "paymentMethodId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4242424242424242', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProcessPaymentDto.prototype, "cardNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12/25', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProcessPaymentDto.prototype, "expiryDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProcessPaymentDto.prototype, "cvv", void 0);
class PaymentResponseDto {
}
exports.PaymentResponseDto = PaymentResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-payment-id' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-collaboration-id' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "collaborationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { id: 'uuid-payer-id', email: 'brand@example.com' } }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "payer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { id: 'uuid-payee-id', email: 'creator@example.com' } }),
    __metadata("design:type", Object)
], PaymentResponseDto.prototype, "payee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "platformFee", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 950 }),
    __metadata("design:type", Number)
], PaymentResponseDto.prototype, "netAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'USD' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "currency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment for Instagram campaign' }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.PaymentStatus, example: enums_1.PaymentStatus.COMPLETED }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'txn_1234567890', nullable: true }),
    __metadata("design:type", String)
], PaymentResponseDto.prototype, "transactionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-12T10:00:00Z', nullable: true }),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PaymentResponseDto.prototype, "updatedAt", void 0);
class PaymentStatsDto {
}
exports.PaymentStatsDto = PaymentStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "completedPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "pendingPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "failedPayments", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 25000 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1250 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalFees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 23750 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "totalNetAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    __metadata("design:type", Number)
], PaymentStatsDto.prototype, "averageAmount", void 0);
class MonthlyRevenueDto {
}
exports.MonthlyRevenueDto = MonthlyRevenueDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-01T00:00:00Z' }),
    __metadata("design:type", Date)
], MonthlyRevenueDto.prototype, "month", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000 }),
    __metadata("design:type", Number)
], MonthlyRevenueDto.prototype, "revenue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5 }),
    __metadata("design:type", Number)
], MonthlyRevenueDto.prototype, "count", void 0);
//# sourceMappingURL=payment.dto.js.map
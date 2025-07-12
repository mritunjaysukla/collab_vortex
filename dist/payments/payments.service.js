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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
const enums_1 = require("../common/enums");
let PaymentService = class PaymentService {
    constructor(paymentRepository) {
        this.paymentRepository = paymentRepository;
    }
    async create(createPaymentDto) {
        const payment = this.paymentRepository.create({
            ...createPaymentDto,
            collaboration: { id: createPaymentDto.collaborationId },
            payer: { id: createPaymentDto.payerId },
            payee: { id: createPaymentDto.payeeId },
            status: enums_1.PaymentStatus.PENDING,
        });
        const platformFeeRate = 0.05;
        payment.platformFee = payment.amount * platformFeeRate;
        payment.netAmount = payment.amount - payment.platformFee;
        return await this.paymentRepository.save(payment);
    }
    async findAll() {
        return await this.paymentRepository.find({
            relations: ['collaboration', 'payer', 'payee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByCollaboration(collaborationId) {
        return await this.paymentRepository.find({
            where: { collaboration: { id: collaborationId } },
            relations: ['payer', 'payee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByUser(userId) {
        return await this.paymentRepository.find({
            where: [
                { payer: { id: userId } },
                { payee: { id: userId } }
            ],
            relations: ['collaboration', 'payer', 'payee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByPayer(payerId) {
        return await this.paymentRepository.find({
            where: { payer: { id: payerId } },
            relations: ['collaboration', 'payee'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByPayee(payeeId) {
        return await this.paymentRepository.find({
            where: { payee: { id: payeeId } },
            relations: ['collaboration', 'payer'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const payment = await this.paymentRepository.findOne({
            where: { id },
            relations: ['collaboration', 'payer', 'payee'],
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async update(id, updatePaymentDto) {
        const payment = await this.findOne(id);
        Object.assign(payment, updatePaymentDto);
        return await this.paymentRepository.save(payment);
    }
    async remove(id) {
        const payment = await this.findOne(id);
        await this.paymentRepository.remove(payment);
    }
    async processPayment(id, processPaymentDto) {
        const payment = await this.findOne(id);
        if (payment.status !== enums_1.PaymentStatus.PENDING) {
            throw new common_1.BadRequestException('Payment is not in pending status');
        }
        try {
            const success = await this.simulatePaymentProcessing(payment, processPaymentDto);
            if (success) {
                payment.status = enums_1.PaymentStatus.COMPLETED;
                payment.transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                payment.paidAt = new Date();
                payment.paymentMethodId = processPaymentDto.paymentMethodId;
            }
            else {
                payment.status = enums_1.PaymentStatus.FAILED;
            }
            return await this.paymentRepository.save(payment);
        }
        catch (error) {
            payment.status = enums_1.PaymentStatus.FAILED;
            await this.paymentRepository.save(payment);
            throw error;
        }
    }
    async requestRefund(id, reason) {
        const payment = await this.findOne(id);
        if (payment.status !== enums_1.PaymentStatus.COMPLETED) {
            throw new common_1.BadRequestException('Only completed payments can be refunded');
        }
        payment.status = enums_1.PaymentStatus.REFUNDED;
        payment.description = `${payment.description} - REFUNDED: ${reason}`;
        return await this.paymentRepository.save(payment);
    }
    async simulatePaymentProcessing(payment, processPaymentDto) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return Math.random() > 0.1;
    }
    async getPaymentStats(userId) {
        const queryBuilder = this.paymentRepository.createQueryBuilder('payment');
        if (userId) {
            queryBuilder.where('payment.payerId = :userId OR payment.payeeId = :userId', { userId });
        }
        const [totalPayments, completedPayments, pendingPayments, failedPayments] = await Promise.all([
            queryBuilder.getCount(),
            queryBuilder.clone().andWhere('payment.status = :status', { status: enums_1.PaymentStatus.COMPLETED }).getCount(),
            queryBuilder.clone().andWhere('payment.status = :status', { status: enums_1.PaymentStatus.PENDING }).getCount(),
            queryBuilder.clone().andWhere('payment.status = :status', { status: enums_1.PaymentStatus.FAILED }).getCount(),
        ]);
        const stats = await queryBuilder
            .select([
            'SUM(payment.amount) as totalAmount',
            'SUM(payment.platformFee) as totalFees',
            'SUM(payment.netAmount) as totalNetAmount',
            'AVG(payment.amount) as averageAmount',
        ])
            .where('payment.status = :status', { status: enums_1.PaymentStatus.COMPLETED })
            .getRawOne();
        return {
            totalPayments,
            completedPayments,
            pendingPayments,
            failedPayments,
            totalAmount: parseFloat(stats.totalAmount) || 0,
            totalFees: parseFloat(stats.totalFees) || 0,
            totalNetAmount: parseFloat(stats.totalNetAmount) || 0,
            averageAmount: parseFloat(stats.averageAmount) || 0,
        };
    }
    async getMonthlyRevenue(userId) {
        const queryBuilder = this.paymentRepository
            .createQueryBuilder('payment')
            .select([
            "DATE_TRUNC('month', payment.createdAt) as month",
            'SUM(payment.amount) as revenue',
            'COUNT(payment.id) as count',
        ])
            .where('payment.status = :status', { status: enums_1.PaymentStatus.COMPLETED })
            .groupBy("DATE_TRUNC('month', payment.createdAt)")
            .orderBy('month', 'DESC')
            .limit(12);
        if (userId) {
            queryBuilder.andWhere('payment.payeeId = :userId', { userId });
        }
        const results = await queryBuilder.getRawMany();
        return results.map(result => ({
            month: result.month,
            revenue: parseFloat(result.revenue),
            count: parseInt(result.count),
        }));
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentService);
//# sourceMappingURL=payments.service.js.map
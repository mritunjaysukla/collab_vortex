import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto, ProcessPaymentDto } from './dto/payment.dto';
import { PaymentStatus } from '../common/enums';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      collaboration: { id: createPaymentDto.collaborationId } as any,
      payer: { id: createPaymentDto.payerId } as any,
      payee: { id: createPaymentDto.payeeId } as any,
      status: PaymentStatus.PENDING,
    });

    // Calculate platform fee (5% default)
    const platformFeeRate = 0.05;
    payment.platformFee = payment.amount * platformFeeRate;
    payment.netAmount = payment.amount - payment.platformFee;

    return await this.paymentRepository.save(payment);
  }

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: ['collaboration', 'payer', 'payee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCollaboration(collaborationId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { collaboration: { id: collaborationId } },
      relations: ['payer', 'payee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: [
        { payer: { id: userId } },
        { payee: { id: userId } }
      ],
      relations: ['collaboration', 'payer', 'payee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByPayer(payerId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { payer: { id: payerId } },
      relations: ['collaboration', 'payee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByPayee(payeeId: string): Promise<Payment[]> {
    return await this.paymentRepository.find({
      where: { payee: { id: payeeId } },
      relations: ['collaboration', 'payer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['collaboration', 'payer', 'payee'],
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);
    Object.assign(payment, updatePaymentDto);
    return await this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
  }

  async processPayment(id: string, processPaymentDto: ProcessPaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException('Payment is not in pending status');
    }

    try {
      // Simulate payment processing
      // In real implementation, integrate with Stripe, PayPal, etc.
      const success = await this.simulatePaymentProcessing(payment, processPaymentDto);

      if (success) {
        payment.status = PaymentStatus.COMPLETED;
        payment.transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        payment.paidAt = new Date();
        payment.paymentMethodId = processPaymentDto.paymentMethodId;
      } else {
        payment.status = PaymentStatus.FAILED;
      }

      return await this.paymentRepository.save(payment);
    } catch (error) {
      payment.status = PaymentStatus.FAILED;
      await this.paymentRepository.save(payment);
      throw error;
    }
  }

  async requestRefund(id: string, reason: string): Promise<Payment> {
    const payment = await this.findOne(id);

    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Only completed payments can be refunded');
    }

    // Simulate refund processing
    payment.status = PaymentStatus.REFUNDED;
    payment.description = `${payment.description} - REFUNDED: ${reason}`;

    return await this.paymentRepository.save(payment);
  }

  private async simulatePaymentProcessing(payment: Payment, processPaymentDto: ProcessPaymentDto): Promise<boolean> {
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate random success/failure (90% success rate for demo)
    return Math.random() > 0.1;
  }

  // Analytics methods
  async getPaymentStats(userId?: string): Promise<any> {
    const queryBuilder = this.paymentRepository.createQueryBuilder('payment');

    if (userId) {
      queryBuilder.where('payment.payerId = :userId OR payment.payeeId = :userId', { userId });
    }

    const [totalPayments, completedPayments, pendingPayments, failedPayments] = await Promise.all([
      queryBuilder.getCount(),
      queryBuilder.clone().andWhere('payment.status = :status', { status: PaymentStatus.COMPLETED }).getCount(),
      queryBuilder.clone().andWhere('payment.status = :status', { status: PaymentStatus.PENDING }).getCount(),
      queryBuilder.clone().andWhere('payment.status = :status', { status: PaymentStatus.FAILED }).getCount(),
    ]);

    const stats = await queryBuilder
      .select([
        'SUM(payment.amount) as totalAmount',
        'SUM(payment.platformFee) as totalFees',
        'SUM(payment.netAmount) as totalNetAmount',
        'AVG(payment.amount) as averageAmount',
      ])
      .where('payment.status = :status', { status: PaymentStatus.COMPLETED })
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

  async getMonthlyRevenue(userId?: string): Promise<any[]> {
    const queryBuilder = this.paymentRepository
      .createQueryBuilder('payment')
      .select([
        "DATE_TRUNC('month', payment.createdAt) as month",
        'SUM(payment.amount) as revenue',
        'COUNT(payment.id) as count',
      ])
      .where('payment.status = :status', { status: PaymentStatus.COMPLETED })
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
}

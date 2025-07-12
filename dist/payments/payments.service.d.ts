import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto, ProcessPaymentDto } from './dto/payment.dto';
export declare class PaymentService {
    private readonly paymentRepository;
    constructor(paymentRepository: Repository<Payment>);
    create(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    findByCollaboration(collaborationId: string): Promise<Payment[]>;
    findByUser(userId: string): Promise<Payment[]>;
    findByPayer(payerId: string): Promise<Payment[]>;
    findByPayee(payeeId: string): Promise<Payment[]>;
    findOne(id: string): Promise<Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment>;
    remove(id: string): Promise<void>;
    processPayment(id: string, processPaymentDto: ProcessPaymentDto): Promise<Payment>;
    requestRefund(id: string, reason: string): Promise<Payment>;
    private simulatePaymentProcessing;
    getPaymentStats(userId?: string): Promise<any>;
    getMonthlyRevenue(userId?: string): Promise<any[]>;
}

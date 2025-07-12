import { PaymentService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto, ProcessPaymentDto } from './dto/payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    findAll(): Promise<import("./entities/payment.entity").Payment[]>;
    findMyPayments(req: any): Promise<import("./entities/payment.entity").Payment[]>;
    findOutgoingPayments(req: any): Promise<import("./entities/payment.entity").Payment[]>;
    findIncomingPayments(req: any): Promise<import("./entities/payment.entity").Payment[]>;
    findByCollaboration(collaborationId: string): Promise<import("./entities/payment.entity").Payment[]>;
    getStats(req: any, userId?: string): Promise<any>;
    getMonthlyRevenue(req: any, userId?: string): Promise<any[]>;
    findOne(id: string): Promise<import("./entities/payment.entity").Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<import("./entities/payment.entity").Payment>;
    processPayment(id: string, processPaymentDto: ProcessPaymentDto): Promise<import("./entities/payment.entity").Payment>;
    requestRefund(id: string, body: {
        reason: string;
    }): Promise<import("./entities/payment.entity").Payment>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

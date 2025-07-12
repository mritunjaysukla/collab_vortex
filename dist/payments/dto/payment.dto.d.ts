import { PaymentStatus } from '../../common/enums';
export declare class CreatePaymentDto {
    collaborationId: string;
    payerId: string;
    payeeId: string;
    amount: number;
    description: string;
    currency: string;
}
declare const UpdatePaymentDto_base: import("@nestjs/common").Type<Partial<CreatePaymentDto>>;
export declare class UpdatePaymentDto extends UpdatePaymentDto_base {
    status?: PaymentStatus;
    transactionId?: string;
}
export declare class ProcessPaymentDto {
    paymentMethodId: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
}
export declare class PaymentResponseDto {
    id: string;
    collaborationId: string;
    payer: {
        id: string;
        email: string;
    };
    payee: {
        id: string;
        email: string;
    };
    amount: number;
    platformFee: number;
    netAmount: number;
    currency: string;
    description: string;
    status: PaymentStatus;
    transactionId: string | null;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaymentStatsDto {
    totalPayments: number;
    completedPayments: number;
    pendingPayments: number;
    failedPayments: number;
    totalAmount: number;
    totalFees: number;
    totalNetAmount: number;
    averageAmount: number;
}
export declare class MonthlyRevenueDto {
    month: Date;
    revenue: number;
    count: number;
}
export {};

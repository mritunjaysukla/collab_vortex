import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { User } from '../../users/entities/user.entity';
import { PaymentStatus } from '../../common/enums';
export declare class Payment {
    id: string;
    collaboration: Collaboration;
    payer: User;
    payee: User;
    amount: number;
    status: PaymentStatus;
    paymentMethodId: string;
    transactionId: string;
    currency: string;
    description: string;
    paidAt: Date;
    platformFee: number;
    netAmount: number;
    createdAt: Date;
    updatedAt: Date;
}

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, IsNumber, IsOptional, IsEnum, Min } from 'class-validator';
import { PaymentStatus } from '../../common/enums';

export class CreatePaymentDto {
  @ApiProperty({ example: 'uuid-collaboration-id' })
  @IsUUID()
  collaborationId: string;

  @ApiProperty({ example: 'uuid-payer-id' })
  @IsUUID()
  payerId: string;

  @ApiProperty({ example: 'uuid-payee-id' })
  @IsUUID()
  payeeId: string;

  @ApiProperty({ example: 1000, minimum: 1 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ example: 'Payment for Instagram campaign deliverable' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'USD' })
  @IsString()
  currency: string = 'USD';
}

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @ApiProperty({ enum: PaymentStatus, required: false })
  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;

  @ApiProperty({ example: 'txn_1234567890', required: false })
  @IsString()
  @IsOptional()
  transactionId?: string;
}

export class ProcessPaymentDto {
  @ApiProperty({ example: 'card_1234567890' })
  @IsString()
  paymentMethodId: string;

  @ApiProperty({ example: '4242424242424242', required: false })
  @IsString()
  @IsOptional()
  cardNumber?: string;

  @ApiProperty({ example: '12/25', required: false })
  @IsString()
  @IsOptional()
  expiryDate?: string;

  @ApiProperty({ example: '123', required: false })
  @IsString()
  @IsOptional()
  cvv?: string;
}

export class PaymentResponseDto {
  @ApiProperty({ example: 'uuid-payment-id' })
  id: string;

  @ApiProperty({ example: 'uuid-collaboration-id' })
  collaborationId: string;

  @ApiProperty({ example: { id: 'uuid-payer-id', email: 'brand@example.com' } })
  payer: {
    id: string;
    email: string;
  };

  @ApiProperty({ example: { id: 'uuid-payee-id', email: 'creator@example.com' } })
  payee: {
    id: string;
    email: string;
  };

  @ApiProperty({ example: 1000 })
  amount: number;

  @ApiProperty({ example: 50 })
  platformFee: number;

  @ApiProperty({ example: 950 })
  netAmount: number;

  @ApiProperty({ example: 'USD' })
  currency: string;

  @ApiProperty({ example: 'Payment for Instagram campaign' })
  description: string;

  @ApiProperty({ enum: PaymentStatus, example: PaymentStatus.COMPLETED })
  status: PaymentStatus;

  @ApiProperty({ example: 'txn_1234567890', nullable: true })
  transactionId: string | null;

  @ApiProperty({ example: '2024-07-12T10:00:00Z', nullable: true })
  paidAt: Date | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaymentStatsDto {
  @ApiProperty({ example: 25 })
  totalPayments: number;

  @ApiProperty({ example: 20 })
  completedPayments: number;

  @ApiProperty({ example: 3 })
  pendingPayments: number;

  @ApiProperty({ example: 2 })
  failedPayments: number;

  @ApiProperty({ example: 25000 })
  totalAmount: number;

  @ApiProperty({ example: 1250 })
  totalFees: number;

  @ApiProperty({ example: 23750 })
  totalNetAmount: number;

  @ApiProperty({ example: 1000 })
  averageAmount: number;
}

export class MonthlyRevenueDto {
  @ApiProperty({ example: '2024-07-01T00:00:00Z' })
  month: Date;

  @ApiProperty({ example: 5000 })
  revenue: number;

  @ApiProperty({ example: 5 })
  count: number;
}

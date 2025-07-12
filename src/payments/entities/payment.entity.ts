import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { User } from '../../users/entities/user.entity';
import { PaymentStatus } from '../../common/enums';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Collaboration)
  @JoinColumn()
  collaboration: Collaboration;

  @ManyToOne(() => User)
  @JoinColumn()
  payer: User; // Brand user

  @ManyToOne(() => User)
  @JoinColumn()
  payee: User; // Creator user

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ nullable: true })
  paymentMethodId: string;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  currency: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'timestamp', nullable: true })
  paidAt: Date;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  platformFee: number; // Platform commission

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  netAmount: number; // Amount after platform fee

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

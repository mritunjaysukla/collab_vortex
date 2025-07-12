import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { ContractStatus } from '../../common/enums';

@Entity('contracts')
export class Contract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Collaboration, (collaboration) => collaboration.contract)
  @JoinColumn()
  collaboration: Collaboration;

  @Column('text')
  terms: string;

  @Column('jsonb', { nullable: true })
  milestones: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    payment?: number;
  }[];

  @Column({ type: 'timestamp', nullable: true })
  signedAt: Date;

  @Column({
    type: 'enum',
    enum: ContractStatus,
    default: ContractStatus.DRAFT,
  })
  status: ContractStatus;

  @Column({ default: false })
  approved: boolean;

  @Column({ nullable: true })
  creatorSignature: string;

  @Column({ nullable: true })
  brandSignature: string;

  @Column('text', { nullable: true })
  additionalTerms: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

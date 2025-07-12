import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { Contract } from '../../contracts/entities/contract.entity';
import { Deliverable } from '../../deliverables/entities/deliverable.entity';
import { Review } from '../../reviews/entities/review.entity';
import { CollaborationStatus } from '../../common/enums';

@Entity('collaborations')
export class Collaboration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Campaign, (campaign) => campaign.collaborations)
  @JoinColumn()
  campaign: Campaign;

  @OneToOne(() => Proposal, (proposal) => proposal.collaboration)
  @JoinColumn()
  proposal: Proposal;

  @OneToOne(() => Contract, (contract) => contract.collaboration)
  contract?: Contract;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: CollaborationStatus,
    default: CollaborationStatus.PENDING,
  })
  status: CollaborationStatus;

  @Column({ default: false })
  isCompleted: boolean;

  @Column('text', { nullable: true })
  notes: string;

  @Column('decimal', { precision: 3, scale: 2, default: 0 })
  progress: number; // Progress percentage (0.00 to 1.00)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Deliverable, (deliverable) => deliverable.collaboration)
  deliverables: Deliverable[];

  @OneToMany(() => Review, (review) => review.collaboration)
  reviews: Review[];
}

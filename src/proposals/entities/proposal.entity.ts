import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { ProposalStatus } from '../../common/enums';

@Entity('proposals')
export class Proposal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CreatorProfile, (creatorProfile) => creatorProfile.proposals)
  @JoinColumn()
  creatorProfile: CreatorProfile;

  @ManyToOne(() => Campaign, (campaign) => campaign.proposals)
  @JoinColumn()
  campaign: Campaign;

  @Column('text', { nullable: true })
  customMessage: string;

  @Column('decimal', { precision: 10, scale: 2 })
  rate: number;

  @Column({
    type: 'enum',
    enum: ProposalStatus,
    default: ProposalStatus.PENDING,
  })
  status: ProposalStatus;

  @Column({ nullable: true })
  portfolioLink: string;

  @Column('text', { array: true, default: '{}' })
  deliverableProposals: string[];

  @Column({ type: 'date', nullable: true })
  proposedStartDate: Date;

  @Column({ type: 'date', nullable: true })
  proposedEndDate: Date;

  @Column('text', { nullable: true })
  rejectionReason: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Collaboration, (collaboration) => collaboration.proposal)
  collaboration?: Collaboration;
}

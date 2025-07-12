import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BrandProfile } from '../../brand-profile/entities/brand-profile.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { Platform } from '../../common/enums';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BrandProfile, (brandProfile) => brandProfile.campaigns)
  @JoinColumn()
  brandProfile: BrandProfile;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 15, scale: 2 })
  budget: number;

  @Column('text', { array: true, default: '{}' })
  targetAudience: string[];

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: Platform,
    array: true,
    default: '{}',
  })
  platforms: Platform[];

  @Column('text', { array: true, default: '{}' })
  deliverables: string[];

  @Column('jsonb', { nullable: true })
  requirements: {
    minFollowers?: number;
    minEngagementRate?: number;
    ageRange?: string;
    location?: string[];
    niches?: string[];
  };

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Proposal, (proposal) => proposal.campaign)
  proposals: Proposal[];

  @OneToMany(() => Collaboration, (collaboration) => collaboration.campaign)
  collaborations: Collaboration[];
}

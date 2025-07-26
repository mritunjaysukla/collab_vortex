import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { PlatformIntegration } from '../../platform-integrations/entities/platform-integration.entity';
import { CreatorAnalytics } from '../../analytics/entities/creator-analytics.entity';

export interface PlatformStat {
  platform: string;
  followers: number;
  engagementRate: number;
  avgViews?: number;
}

@Entity('creator_profiles')
@Index(['isVerified', 'createdAt'])
@Index(['niches'], { where: 'niches IS NOT NULL' })
export class CreatorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.creatorProfile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  @Index()
  name: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column({ nullable: true })
  profileImageFilename: string;

  @Column({ nullable: true })
  profileImageMimetype: string;

  @Column({ nullable: true })
  profileImageSize: number;

  @Column('jsonb', { nullable: true })
  platformStats: PlatformStat[];

  @Column({ default: false })
  @Index()
  isVerified: boolean;

  @Column('text', { array: true, default: '{}' })
  niches: string[];

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  mediaKit: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  baseRate: number;

  @Column({ nullable: true })
  portfolioUrl: string;

  @Column('jsonb', { nullable: true })
  socialLinks: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
    twitter?: string;
    linkedin?: string;
  };

  @Column({ default: true })
  isAvailable: boolean;

  @Column('decimal', { precision: 3, scale: 2, nullable: true })
  averageRating: number;

  @Column({ default: 0 })
  totalCollaborations: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Proposal, (proposal) => proposal.creatorProfile, { cascade: true })
  proposals: Proposal[];

  @OneToMany(() => PlatformIntegration, (integration) => integration.creatorProfile, { cascade: true })
  platformIntegrations: PlatformIntegration[];

  @OneToMany(() => CreatorAnalytics, (analytics) => analytics.creatorProfile, { cascade: true })
  analytics: CreatorAnalytics[];
}

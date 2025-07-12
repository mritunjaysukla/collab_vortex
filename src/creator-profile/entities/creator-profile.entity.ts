import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { PlatformIntegration } from '../../platform-integrations/entities/platform-integration.entity';
import { CreatorAnalytics } from '../../analytics/entities/creator-analytics.entity';

@Entity('creator_profiles')
export class CreatorProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.creatorProfile)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column('jsonb', { nullable: true })
  platformStats: {
    platform: string;
    followers: number;
    engagementRate: number;
    avgViews: number;
  }[];

  @Column({ default: false })
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Proposal, (proposal) => proposal.creatorProfile)
  proposals: Proposal[];

  @OneToMany(() => PlatformIntegration, (integration) => integration.creatorProfile)
  platformIntegrations: PlatformIntegration[];

  @OneToMany(() => CreatorAnalytics, (analytics) => analytics.creatorProfile)
  analytics: CreatorAnalytics[];
}

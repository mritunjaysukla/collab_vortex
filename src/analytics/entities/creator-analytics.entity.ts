import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { Platform } from '../../common/enums';

@Entity('creator_analytics')
export class CreatorAnalytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CreatorProfile, (creatorProfile) => creatorProfile.analytics)
  @JoinColumn()
  creatorProfile: CreatorProfile;

  @Column({
    type: 'enum',
    enum: Platform,
  })
  platform: Platform;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: 0 })
  followers: number;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  engagementRate: number;

  @Column({ default: 0 })
  reach: number;

  @Column({ default: 0 })
  views: number;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  comments: number;

  @Column({ default: 0 })
  shares: number;

  @Column({ default: 0 })
  saves: number;

  @Column('jsonb', { nullable: true })
  demographicData: {
    ageGroups: { [key: string]: number };
    genderDistribution: { [key: string]: number };
    topLocations: string[];
    interests: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

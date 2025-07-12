import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Platform } from '../../common/enums';

@Entity('campaign_analytics')
export class CampaignAnalytics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Campaign)
  @JoinColumn()
  campaign: Campaign;

  @Column({
    type: 'enum',
    enum: Platform,
  })
  platform: Platform;

  @Column({ type: 'date' })
  date: Date;

  @Column({ default: 0 })
  impressions: number;

  @Column({ default: 0 })
  reach: number;

  @Column({ default: 0 })
  engagement: number;

  @Column({ default: 0 })
  clicks: number;

  @Column({ default: 0 })
  conversions: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  cost: number;

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  cpm: number; // Cost per mille (thousand impressions)

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  cpc: number; // Cost per click

  @Column('decimal', { precision: 10, scale: 4, default: 0 })
  cpa: number; // Cost per acquisition

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  roi: number; // Return on investment

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

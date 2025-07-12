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

@Entity('platform_integrations')
export class PlatformIntegration {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CreatorProfile, (creatorProfile) => creatorProfile.platformIntegrations)
  @JoinColumn()
  creatorProfile: CreatorProfile;

  @Column({
    type: 'enum',
    enum: Platform,
  })
  platform: Platform;

  @Column({ nullable: true })
  authToken: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ type: 'timestamp', nullable: true })
  tokenExpiresAt: Date;

  @Column({ default: 'disconnected' })
  syncStatus: string; // 'connected', 'disconnected', 'error', 'syncing'

  @Column({ type: 'timestamp', nullable: true })
  lastSyncAt: Date;

  @Column({ nullable: true })
  platformUserId: string;

  @Column({ nullable: true })
  platformUsername: string;

  @Column('jsonb', { nullable: true })
  platformData: {
    profileUrl?: string;
    followerCount?: number;
    isVerified?: boolean;
    bio?: string;
    [key: string]: any;
  };

  @Column('text', { nullable: true })
  errorMessage: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

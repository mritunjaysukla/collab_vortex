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
import { BrandProfile } from '../../brand-profile/entities/brand-profile.entity';

export enum ConnectionStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum ConnectionInitiator {
  CREATOR = 'creator',
  BRAND = 'brand',
}

@Entity('connections')
export class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CreatorProfile, { eager: true })
  @JoinColumn()
  creatorProfile: CreatorProfile;

  @ManyToOne(() => BrandProfile, { eager: true })
  @JoinColumn()
  brandProfile: BrandProfile;

  @Column({
    type: 'enum',
    enum: ConnectionStatus,
    default: ConnectionStatus.PENDING,
  })
  status: ConnectionStatus;

  @Column({
    type: 'enum',
    enum: ConnectionInitiator,
  })
  initiator: ConnectionInitiator;

  @Column({ type: 'text', nullable: true })
  message: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
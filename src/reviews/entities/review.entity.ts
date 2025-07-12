import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { User } from '../../users/entities/user.entity';
import { ReviewVisibility } from '../../common/enums';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Collaboration, (collaboration) => collaboration.reviews)
  @JoinColumn()
  collaboration: Collaboration;

  @ManyToOne(() => User)
  @JoinColumn()
  reviewer: User; // The user giving the review

  @ManyToOne(() => User)
  @JoinColumn()
  reviewee: User; // The user being reviewed

  @Column({ type: 'decimal', precision: 2, scale: 1 })
  rating: number; // 1.0 to 5.0

  @Column('text', { nullable: true })
  feedback: string;

  @Column({
    type: 'enum',
    enum: ReviewVisibility,
    default: ReviewVisibility.PUBLIC,
  })
  visibility: ReviewVisibility;

  @Column('text', { array: true, default: '{}' })
  tags: string[]; // e.g., ['professional', 'creative', 'timely']

  @Column({ default: false })
  isVerified: boolean; // Platform-verified review

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

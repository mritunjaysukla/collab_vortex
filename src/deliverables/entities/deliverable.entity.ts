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
import { DeliverableStatus } from '../../common/enums';

@Entity('deliverables')
export class Deliverable {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Collaboration, (collaboration) => collaboration.deliverables)
  @JoinColumn()
  collaboration: Collaboration;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  contentUrl: string;

  @Column({
    type: 'enum',
    enum: DeliverableStatus,
    default: DeliverableStatus.PENDING,
  })
  status: DeliverableStatus;

  @Column('text', { nullable: true })
  feedback: string;

  @Column({ default: 0 })
  revisionCount: number;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  submittedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  approvedAt: Date;

  @Column('text', { array: true, default: '{}' })
  attachments: string[];

  @Column('jsonb', { nullable: true })
  metadata: {
    fileSize?: number;
    fileType?: string;
    duration?: number; // for videos
    dimensions?: { width: number; height: number }; // for images/videos
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

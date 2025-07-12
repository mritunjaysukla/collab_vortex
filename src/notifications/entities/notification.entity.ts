import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { NotificationType } from '../../common/enums';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  message: string;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ default: false })
  read: boolean;

  @Column('jsonb', { nullable: true })
  metadata: {
    campaignId?: string;
    proposalId?: string;
    collaborationId?: string;
    messageId?: string;
    [key: string]: any;
  };

  @Column({ nullable: true })
  actionUrl: string; // URL to navigate when notification is clicked

  @CreateDateColumn()
  createdAt: Date;
}

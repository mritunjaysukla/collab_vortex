import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User)
  @JoinColumn()
  recipient: User;

  @Column('text')
  text: string;

  @Column({ nullable: true })
  attachmentUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  readAt: Date;

  @Column({ default: false })
  isSystemMessage: boolean;

  @Column({ nullable: true })
  conversationId: string; // To group messages

  @CreateDateColumn()
  timestamp: Date;
}

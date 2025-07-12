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
import { Campaign } from '../../campaigns/entities/campaign.entity';

@Entity('brand_profiles')
export class BrandProfile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.brandProfile)
  @JoinColumn()
  user: User;

  @Column()
  companyName: string;

  @Column({ nullable: true })
  industry: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  teamSize: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  location: string;

  @Column('text', { array: true, default: '{}' })
  targetAudience: string[];

  @Column('decimal', { precision: 15, scale: 2, nullable: true })
  monthlyBudget: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Campaign, (campaign) => campaign.brandProfile)
  campaigns: Campaign[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserRole } from '../../common/enums';
import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { BrandProfile } from '../../brand-profile/entities/brand-profile.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isProfileComplete: boolean;

  @Column({ nullable: true })
  refreshToken?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => CreatorProfile, (profile) => profile.user, { cascade: true })
  creatorProfile?: CreatorProfile;

  @OneToOne(() => BrandProfile, (profile) => profile.user, { cascade: true })
  brandProfile?: BrandProfile;
}

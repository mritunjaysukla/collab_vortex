import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserRole } from '../../common/enums'; // Update path if 'enums.ts' is in 'src/common'
import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity'; // Update path if needed
import { BrandProfile } from '../../brand-profile/entities/brand-profile.entity'; // Update path if needed

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

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => CreatorProfile, (profile) => profile.user, { cascade: true })
  creatorProfile?: CreatorProfile;

  @OneToOne(() => BrandProfile, (profile) => profile.user, { cascade: true })
  brandProfile?: BrandProfile;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfileService } from './creator-profile.service';
import { CreatorProfileController } from './creator-profile.controller';
import { CreatorProfile } from './entities/creator-profile.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CreatorProfile, User]),
    UsersModule,
    CommonModule,
  ],
  controllers: [CreatorProfileController],
  providers: [CreatorProfileService],
  exports: [CreatorProfileService],
})
export class CreatorProfileModule { }

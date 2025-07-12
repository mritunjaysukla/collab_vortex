import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorProfileService } from './creator-profile.service';
import { CreatorProfileController } from './creator-profile.controller';
import { CreatorProfile } from './entities/creator-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreatorProfile])],
  controllers: [CreatorProfileController],
  providers: [CreatorProfileService],
  exports: [CreatorProfileService],
})
export class CreatorProfileModule { }

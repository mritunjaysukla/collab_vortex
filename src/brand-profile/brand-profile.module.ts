import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandProfileService } from './brand-profile.service';
import { BrandProfileController } from './brand-profile.controller';
import { BrandProfile } from './entities/brand-profile.entity';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandProfile]),
    UsersModule,
    CommonModule,
  ],
  controllers: [BrandProfileController],
  providers: [BrandProfileService],
  exports: [BrandProfileService],
})
export class BrandProfileModule { }

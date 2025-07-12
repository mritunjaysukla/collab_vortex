import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandProfileService } from './brand-profile.service';
import { BrandProfileController } from './brand-profile.controller';
import { BrandProfile } from './entities/brand-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BrandProfile])],
  controllers: [BrandProfileController],
  providers: [BrandProfileService],
  exports: [BrandProfileService],
})
export class BrandProfileModule { }

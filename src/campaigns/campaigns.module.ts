import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignService } from './campaigns.service';
import { CampaignController } from './campaigns.controller';
import { Campaign } from './entities/campaign.entity';
import { BrandProfileModule } from '../brand-profile/brand-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Campaign]),
    BrandProfileModule,
  ],
  controllers: [CampaignController],
  providers: [CampaignService],
  exports: [CampaignService],
})
export class CampaignModule { }

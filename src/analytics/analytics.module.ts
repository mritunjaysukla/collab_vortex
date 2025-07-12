import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorAnalytics } from './entities/creator-analytics.entity';
import { CampaignAnalytics } from './entities/campaign-analytics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreatorAnalytics, CampaignAnalytics])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AnalyticsModule { }

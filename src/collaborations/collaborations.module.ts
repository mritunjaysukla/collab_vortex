import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollaborationService } from './collaborations.service';
import { CollaborationController } from './collaborations.controller';
import { Collaboration } from './entities/collaboration.entity';
import { CampaignModule } from '../campaigns/campaigns.module';
import { ProposalModule } from '../proposals/proposals.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Collaboration]),
    CampaignModule,
    ProposalModule,
  ],
  controllers: [CollaborationController],
  providers: [CollaborationService],
  exports: [CollaborationService],
})
export class CollaborationModule { }

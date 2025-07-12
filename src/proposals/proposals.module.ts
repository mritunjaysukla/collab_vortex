import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProposalService } from './proposals.service';
import { ProposalController } from './proposals.controller';
import { Proposal } from './entities/proposal.entity';
import { CreatorProfileModule } from '../creator-profile/creator-profile.module';
import { CampaignModule } from '../campaigns/campaigns.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Proposal]),
    CreatorProfileModule,
    CampaignModule,
  ],
  controllers: [ProposalController],
  providers: [ProposalService],
  exports: [ProposalService],
})
export class ProposalModule { }

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proposal } from './entities/proposal.entity';
import { CreateProposalDto, UpdateProposalDto } from './dto/proposal.dto';
import { CreatorProfileService } from '../creator-profile/creator-profile.service';
import { CampaignService } from '../campaigns/campaigns.service';
import { ProposalStatus } from '../common/enums';

@Injectable()
export class ProposalService {
  constructor(
    @InjectRepository(Proposal)
    private readonly proposalRepository: Repository<Proposal>,
    private readonly creatorProfileService: CreatorProfileService,
    private readonly campaignService: CampaignService,
  ) { }

  async create(
    userId: string,
    createProposalDto: CreateProposalDto,
  ): Promise<Proposal> {
    const creatorProfile = await this.creatorProfileService.findEntityByUserId(userId);
    if (!creatorProfile) {
      throw new ForbiddenException('Creator profile required to create proposals');
    }

    const campaign = await this.campaignService.findOne(createProposalDto.campaignId);

    // Check if proposal already exists for this campaign and creator
    const existingProposal = await this.proposalRepository.findOne({
      where: {
        creatorProfile: { id: creatorProfile.id },
        campaign: { id: campaign.id },
      },
    });

    if (existingProposal) {
      throw new ForbiddenException('Proposal already exists for this campaign');
    }

    const proposalData = { ...createProposalDto };
    if (createProposalDto.proposedStartDate) {
      proposalData.proposedStartDate = new Date(createProposalDto.proposedStartDate) as any;
    }
    if (createProposalDto.proposedEndDate) {
      proposalData.proposedEndDate = new Date(createProposalDto.proposedEndDate) as any;
    }

    const proposal = this.proposalRepository.create({
      ...proposalData,
      creatorProfile,
      campaign,
    });

    return await this.proposalRepository.save(proposal);
  }

  async findAll(): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      relations: ['creatorProfile', 'campaign', 'collaboration'],
    });
  }

  async findOne(id: string): Promise<Proposal> {
    const proposal = await this.proposalRepository.findOne({
      where: { id },
      relations: ['creatorProfile', 'campaign', 'collaboration'],
    });

    if (!proposal) {
      throw new NotFoundException(`Proposal with ID ${id} not found`);
    }

    return proposal;
  }

  async findByCampaign(campaignId: string): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { campaign: { id: campaignId } },
      relations: ['creatorProfile', 'campaign'],
    });
  }

  async findByCreator(userId: string): Promise<Proposal[]> {
    const creatorProfile = await this.creatorProfileService.findByUserId(userId);
    if (!creatorProfile) {
      return [];
    }

    return await this.proposalRepository.find({
      where: { creatorProfile: { id: creatorProfile.id } },
      relations: ['campaign', 'collaboration'],
    });
  }

  async findByBrand(userId: string): Promise<Proposal[]> {
    return await this.proposalRepository
      .createQueryBuilder('proposal')
      .leftJoinAndSelect('proposal.creatorProfile', 'creatorProfile')
      .leftJoinAndSelect('proposal.campaign', 'campaign')
      .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
      .leftJoinAndSelect('brandProfile.user', 'user')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async update(
    id: string,
    updateProposalDto: UpdateProposalDto,
  ): Promise<Proposal> {
    const proposal = await this.findOne(id);

    const updateData = { ...updateProposalDto };
    if (updateProposalDto.proposedStartDate) {
      updateData.proposedStartDate = new Date(updateProposalDto.proposedStartDate) as any;
    }
    if (updateProposalDto.proposedEndDate) {
      updateData.proposedEndDate = new Date(updateProposalDto.proposedEndDate) as any;
    }

    Object.assign(proposal, updateData);
    return await this.proposalRepository.save(proposal);
  }

  async remove(id: string): Promise<void> {
    const proposal = await this.findOne(id);
    await this.proposalRepository.remove(proposal);
  }

  async acceptProposal(id: string): Promise<Proposal> {
    return await this.update(id, { status: ProposalStatus.ACCEPTED });
  }

  async rejectProposal(id: string, rejectionReason?: string): Promise<Proposal> {
    return await this.update(id, {
      status: ProposalStatus.REJECTED,
      rejectionReason,
    });
  }

  async findByStatus(status: ProposalStatus): Promise<Proposal[]> {
    return await this.proposalRepository.find({
      where: { status },
      relations: ['creatorProfile', 'campaign'],
    });
  }
}

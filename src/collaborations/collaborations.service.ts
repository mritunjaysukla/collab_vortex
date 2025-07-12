import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Collaboration } from './entities/collaboration.entity';
import { CreateCollaborationDto, UpdateCollaborationDto } from './dto/collaboration.dto';
import { CampaignService } from '../campaigns/campaigns.service';
import { ProposalService } from '../proposals/proposals.service';
import { CollaborationStatus, ProposalStatus } from '../common/enums';

@Injectable()
export class CollaborationService {
  constructor(
    @InjectRepository(Collaboration)
    private readonly collaborationRepository: Repository<Collaboration>,
    private readonly campaignService: CampaignService,
    private readonly proposalService: ProposalService,
  ) { }

  async create(createCollaborationDto: CreateCollaborationDto): Promise<Collaboration> {
    const campaign = await this.campaignService.findOne(createCollaborationDto.campaignId);
    const proposal = await this.proposalService.findOne(createCollaborationDto.proposalId);

    // Check if proposal is accepted
    if (proposal.status !== ProposalStatus.ACCEPTED) {
      throw new ConflictException('Proposal must be accepted to create collaboration');
    }

    // Check if collaboration already exists for this proposal
    const existingCollaboration = await this.collaborationRepository.findOne({
      where: { proposal: { id: proposal.id } },
    });

    if (existingCollaboration) {
      throw new ConflictException('Collaboration already exists for this proposal');
    }

    const collaboration = this.collaborationRepository.create({
      ...createCollaborationDto,
      startDate: new Date(createCollaborationDto.startDate),
      endDate: new Date(createCollaborationDto.endDate),
      campaign,
      proposal,
    });

    return await this.collaborationRepository.save(collaboration);
  }

  async findAll(): Promise<Collaboration[]> {
    return await this.collaborationRepository.find({
      relations: ['campaign', 'proposal', 'contract', 'deliverables', 'reviews'],
    });
  }

  async findOne(id: string): Promise<Collaboration> {
    const collaboration = await this.collaborationRepository.findOne({
      where: { id },
      relations: ['campaign', 'proposal', 'contract', 'deliverables', 'reviews'],
    });

    if (!collaboration) {
      throw new NotFoundException(`Collaboration with ID ${id} not found`);
    }

    return collaboration;
  }

  async findByCreator(userId: string): Promise<Collaboration[]> {
    return await this.collaborationRepository
      .createQueryBuilder('collaboration')
      .leftJoinAndSelect('collaboration.campaign', 'campaign')
      .leftJoinAndSelect('collaboration.proposal', 'proposal')
      .leftJoinAndSelect('proposal.creatorProfile', 'creatorProfile')
      .leftJoinAndSelect('creatorProfile.user', 'user')
      .leftJoinAndSelect('collaboration.contract', 'contract')
      .leftJoinAndSelect('collaboration.deliverables', 'deliverables')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async findByBrand(userId: string): Promise<Collaboration[]> {
    return await this.collaborationRepository
      .createQueryBuilder('collaboration')
      .leftJoinAndSelect('collaboration.campaign', 'campaign')
      .leftJoinAndSelect('campaign.brandProfile', 'brandProfile')
      .leftJoinAndSelect('brandProfile.user', 'user')
      .leftJoinAndSelect('collaboration.proposal', 'proposal')
      .leftJoinAndSelect('collaboration.contract', 'contract')
      .leftJoinAndSelect('collaboration.deliverables', 'deliverables')
      .where('user.id = :userId', { userId })
      .getMany();
  }

  async update(
    id: string,
    updateCollaborationDto: UpdateCollaborationDto,
  ): Promise<Collaboration> {
    const collaboration = await this.findOne(id);

    const updateData = { ...updateCollaborationDto };
    if (updateCollaborationDto.startDate) {
      updateData.startDate = new Date(updateCollaborationDto.startDate) as any;
    }
    if (updateCollaborationDto.endDate) {
      updateData.endDate = new Date(updateCollaborationDto.endDate) as any;
    }

    Object.assign(collaboration, updateData);
    return await this.collaborationRepository.save(collaboration);
  }

  async remove(id: string): Promise<void> {
    const collaboration = await this.findOne(id);
    await this.collaborationRepository.remove(collaboration);
  }

  async findByStatus(status: CollaborationStatus): Promise<Collaboration[]> {
    return await this.collaborationRepository.find({
      where: { status },
      relations: ['campaign', 'proposal'],
    });
  }

  async completeCollaboration(id: string): Promise<Collaboration> {
    return await this.update(id, {
      status: CollaborationStatus.COMPLETED,
      isCompleted: true,
      progress: 1.0,
    });
  }

  async updateProgress(id: string, progress: number): Promise<Collaboration> {
    return await this.update(id, { progress });
  }
}

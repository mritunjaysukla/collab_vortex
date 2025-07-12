import { Repository } from 'typeorm';
import { Proposal } from './entities/proposal.entity';
import { CreateProposalDto, UpdateProposalDto } from './dto/proposal.dto';
import { CreatorProfileService } from '../creator-profile/creator-profile.service';
import { CampaignService } from '../campaigns/campaigns.service';
import { ProposalStatus } from '../common/enums';
export declare class ProposalService {
    private readonly proposalRepository;
    private readonly creatorProfileService;
    private readonly campaignService;
    constructor(proposalRepository: Repository<Proposal>, creatorProfileService: CreatorProfileService, campaignService: CampaignService);
    create(userId: string, createProposalDto: CreateProposalDto): Promise<Proposal>;
    findAll(): Promise<Proposal[]>;
    findOne(id: string): Promise<Proposal>;
    findByCampaign(campaignId: string): Promise<Proposal[]>;
    findByCreator(userId: string): Promise<Proposal[]>;
    findByBrand(userId: string): Promise<Proposal[]>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<Proposal>;
    remove(id: string): Promise<void>;
    acceptProposal(id: string): Promise<Proposal>;
    rejectProposal(id: string, rejectionReason?: string): Promise<Proposal>;
    findByStatus(status: ProposalStatus): Promise<Proposal[]>;
}

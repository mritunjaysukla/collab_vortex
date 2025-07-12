import { Repository } from 'typeorm';
import { Collaboration } from './entities/collaboration.entity';
import { CreateCollaborationDto, UpdateCollaborationDto } from './dto/collaboration.dto';
import { CampaignService } from '../campaigns/campaigns.service';
import { ProposalService } from '../proposals/proposals.service';
import { CollaborationStatus } from '../common/enums';
export declare class CollaborationService {
    private readonly collaborationRepository;
    private readonly campaignService;
    private readonly proposalService;
    constructor(collaborationRepository: Repository<Collaboration>, campaignService: CampaignService, proposalService: ProposalService);
    create(createCollaborationDto: CreateCollaborationDto): Promise<Collaboration>;
    findAll(): Promise<Collaboration[]>;
    findOne(id: string): Promise<Collaboration>;
    findByCreator(userId: string): Promise<Collaboration[]>;
    findByBrand(userId: string): Promise<Collaboration[]>;
    update(id: string, updateCollaborationDto: UpdateCollaborationDto): Promise<Collaboration>;
    remove(id: string): Promise<void>;
    findByStatus(status: CollaborationStatus): Promise<Collaboration[]>;
    completeCollaboration(id: string): Promise<Collaboration>;
    updateProgress(id: string, progress: number): Promise<Collaboration>;
}

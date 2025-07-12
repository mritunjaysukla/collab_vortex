import { ProposalService } from './proposals.service';
import { CreateProposalDto, UpdateProposalDto } from './dto/proposal.dto';
import { ProposalStatus } from '../common/enums';
export declare class ProposalController {
    private readonly proposalService;
    constructor(proposalService: ProposalService);
    create(req: any, createProposalDto: CreateProposalDto): Promise<import("./entities/proposal.entity").Proposal>;
    findAll(): Promise<import("./entities/proposal.entity").Proposal[]>;
    findMyProposals(req: any): Promise<import("./entities/proposal.entity").Proposal[]>;
    findBrandProposals(req: any): Promise<import("./entities/proposal.entity").Proposal[]>;
    findByStatus(status: ProposalStatus): Promise<import("./entities/proposal.entity").Proposal[]>;
    findByCampaign(campaignId: string): Promise<import("./entities/proposal.entity").Proposal[]>;
    findOne(id: string): Promise<import("./entities/proposal.entity").Proposal>;
    update(id: string, updateProposalDto: UpdateProposalDto): Promise<import("./entities/proposal.entity").Proposal>;
    acceptProposal(id: string): Promise<import("./entities/proposal.entity").Proposal>;
    rejectProposal(id: string, body: {
        rejectionReason?: string;
    }): Promise<import("./entities/proposal.entity").Proposal>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

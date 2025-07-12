import { ProposalStatus } from '../../common/enums';
export declare class CreateProposalDto {
    campaignId: string;
    customMessage?: string;
    rate: number;
    portfolioLink?: string;
    deliverableProposals?: string[];
    proposedStartDate?: string;
    proposedEndDate?: string;
}
export declare class UpdateProposalDto {
    customMessage?: string;
    rate?: number;
    status?: ProposalStatus;
    portfolioLink?: string;
    deliverableProposals?: string[];
    proposedStartDate?: string;
    proposedEndDate?: string;
    rejectionReason?: string;
}
export declare class ProposalResponseDto {
    id: string;
    customMessage: string;
    rate: number;
    status: ProposalStatus;
    portfolioLink: string;
    deliverableProposals: string[];
    proposedStartDate: Date;
    proposedEndDate: Date;
    rejectionReason: string;
    createdAt: Date;
    updatedAt: Date;
}

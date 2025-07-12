import { CreatorProfile } from '../../creator-profile/entities/creator-profile.entity';
import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { ProposalStatus } from '../../common/enums';
export declare class Proposal {
    id: string;
    creatorProfile: CreatorProfile;
    campaign: Campaign;
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
    collaboration?: Collaboration;
}

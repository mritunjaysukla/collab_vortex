import { Campaign } from '../../campaigns/entities/campaign.entity';
import { Proposal } from '../../proposals/entities/proposal.entity';
import { Contract } from '../../contracts/entities/contract.entity';
import { Deliverable } from '../../deliverables/entities/deliverable.entity';
import { Review } from '../../reviews/entities/review.entity';
import { CollaborationStatus } from '../../common/enums';
export declare class Collaboration {
    id: string;
    campaign: Campaign;
    proposal: Proposal;
    contract?: Contract;
    startDate: Date;
    endDate: Date;
    status: CollaborationStatus;
    isCompleted: boolean;
    notes: string;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
    deliverables: Deliverable[];
    reviews: Review[];
}

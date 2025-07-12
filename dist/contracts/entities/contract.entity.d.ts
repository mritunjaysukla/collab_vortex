import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { ContractStatus } from '../../common/enums';
export declare class Contract {
    id: string;
    collaboration: Collaboration;
    terms: string;
    milestones: {
        id: string;
        title: string;
        description: string;
        dueDate: Date;
        completed: boolean;
        payment?: number;
    }[];
    signedAt: Date;
    status: ContractStatus;
    approved: boolean;
    creatorSignature: string;
    brandSignature: string;
    additionalTerms: string;
    createdAt: Date;
    updatedAt: Date;
}

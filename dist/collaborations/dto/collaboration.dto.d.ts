import { CollaborationStatus } from '../../common/enums';
export declare class CreateCollaborationDto {
    campaignId: string;
    proposalId: string;
    startDate: string;
    endDate: string;
    notes?: string;
}
export declare class UpdateCollaborationDto {
    startDate?: string;
    endDate?: string;
    status?: CollaborationStatus;
    isCompleted?: boolean;
    notes?: string;
    progress?: number;
}
export declare class CollaborationResponseDto {
    id: string;
    startDate: Date;
    endDate: Date;
    status: CollaborationStatus;
    isCompleted: boolean;
    notes: string;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
}

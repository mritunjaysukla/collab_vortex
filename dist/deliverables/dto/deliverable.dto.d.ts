export declare enum DeliverableStatus {
    PENDING = "pending",
    SUBMITTED = "submitted",
    APPROVED = "approved",
    REVISION_REQUESTED = "revision_requested",
    REJECTED = "rejected"
}
export declare class CreateDeliverableDto {
    title: string;
    description?: string;
    dueDate?: string;
    collaborationId: string;
    metadata?: Record<string, any>;
}
export declare class UpdateDeliverableDto {
    title?: string;
    description?: string;
    contentUrl?: string;
    status?: DeliverableStatus;
    feedback?: string;
    dueDate?: string;
    attachments?: string[];
    metadata?: Record<string, any>;
}
export declare class SubmitDeliverableDto {
    contentUrl: string;
    attachments?: string[];
    metadata?: Record<string, any>;
}
export declare class ReviewDeliverableDto {
    status: DeliverableStatus.APPROVED | DeliverableStatus.REVISION_REQUESTED | DeliverableStatus.REJECTED;
    feedback?: string;
}
export declare class DeliverableResponseDto {
    id: string;
    title: string;
    description?: string;
    contentUrl?: string;
    status: DeliverableStatus;
    feedback?: string;
    revisionCount: number;
    dueDate?: Date;
    submittedAt?: Date;
    approvedAt?: Date;
    attachments: string[];
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
    collaboration: {
        id: string;
        status: string;
    };
}

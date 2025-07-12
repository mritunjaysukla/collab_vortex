export declare enum ContractStatus {
    DRAFT = "draft",
    PENDING_SIGNATURE = "pending_signature",
    SIGNED = "signed",
    ACTIVE = "active",
    COMPLETED = "completed",
    CANCELLED = "cancelled"
}
export declare class CreateContractDto {
    terms: string;
    milestones?: Record<string, any>;
    additionalTerms?: string;
    collaborationId: string;
}
export declare class UpdateContractDto {
    terms?: string;
    milestones?: Record<string, any>;
    status?: ContractStatus;
    approved?: boolean;
    creatorSignature?: string;
    brandSignature?: string;
    additionalTerms?: string;
}
export declare class ContractResponseDto {
    id: string;
    terms: string;
    milestones?: Record<string, any>;
    signedAt?: Date;
    status: ContractStatus;
    approved: boolean;
    creatorSignature?: string;
    brandSignature?: string;
    additionalTerms?: string;
    createdAt: Date;
    updatedAt: Date;
    collaboration: {
        id: string;
        status: string;
    };
}

import { Collaboration } from '../../collaborations/entities/collaboration.entity';
import { DeliverableStatus } from '../../common/enums';
export declare class Deliverable {
    id: string;
    collaboration: Collaboration;
    title: string;
    description: string;
    contentUrl: string;
    status: DeliverableStatus;
    feedback: string;
    revisionCount: number;
    dueDate: Date;
    submittedAt: Date;
    approvedAt: Date;
    attachments: string[];
    metadata: {
        fileSize?: number;
        fileType?: string;
        duration?: number;
        dimensions?: {
            width: number;
            height: number;
        };
    };
    createdAt: Date;
    updatedAt: Date;
}

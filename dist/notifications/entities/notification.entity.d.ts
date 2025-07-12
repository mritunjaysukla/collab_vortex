import { User } from '../../users/entities/user.entity';
import { NotificationType } from '../../common/enums';
export declare class Notification {
    id: string;
    user: User;
    message: string;
    type: NotificationType;
    read: boolean;
    metadata: {
        campaignId?: string;
        proposalId?: string;
        collaborationId?: string;
        messageId?: string;
        [key: string]: any;
    };
    actionUrl: string;
    createdAt: Date;
}

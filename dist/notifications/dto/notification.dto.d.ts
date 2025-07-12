import { NotificationType } from '../../common/enums';
export declare class CreateNotificationDto {
    userId: string;
    message: string;
    type: NotificationType;
    metadata?: {
        campaignId?: string;
        proposalId?: string;
        collaborationId?: string;
        messageId?: string;
        [key: string]: any;
    };
    actionUrl?: string;
}
declare const UpdateNotificationDto_base: import("@nestjs/common").Type<Partial<CreateNotificationDto>>;
export declare class UpdateNotificationDto extends UpdateNotificationDto_base {
}
export declare class NotificationResponseDto {
    id: string;
    userId: string;
    message: string;
    type: NotificationType;
    read: boolean;
    metadata?: object;
    actionUrl?: string;
    createdAt: Date;
}
export {};

import { User } from '../../users/entities/user.entity';
export declare class Message {
    id: string;
    sender: User;
    recipient: User;
    text: string;
    attachmentUrl: string;
    readAt: Date;
    isSystemMessage: boolean;
    conversationId: string;
    timestamp: Date;
}

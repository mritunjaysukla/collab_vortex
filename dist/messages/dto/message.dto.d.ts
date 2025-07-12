export declare class CreateMessageDto {
    recipientId: string;
    text: string;
    attachmentUrl?: string;
    conversationId?: string;
    isSystemMessage?: boolean;
}
declare const UpdateMessageDto_base: import("@nestjs/common").Type<Partial<CreateMessageDto>>;
export declare class UpdateMessageDto extends UpdateMessageDto_base {
}
export declare class MessageResponseDto {
    id: string;
    senderId: string;
    recipientId: string;
    text: string;
    attachmentUrl?: string;
    readAt?: Date;
    isSystemMessage: boolean;
    conversationId: string;
    timestamp: Date;
}
export {};

import { MessageService } from './messages.service';
import { CreateMessageDto } from './dto/message.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    create(req: any, createMessageDto: CreateMessageDto): Promise<import("./entities/message.entity").Message>;
    findAll(): Promise<import("./entities/message.entity").Message[]>;
    getUserConversations(req: any): Promise<any[]>;
    getUnreadMessages(req: any): Promise<import("./entities/message.entity").Message[]>;
    getConversationMessages(conversationId: string, req: any): Promise<import("./entities/message.entity").Message[]>;
    findOne(id: string): Promise<import("./entities/message.entity").Message>;
    markAsRead(id: string, req: any): Promise<import("./entities/message.entity").Message>;
    markConversationAsRead(conversationId: string, req: any): Promise<{
        message: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}

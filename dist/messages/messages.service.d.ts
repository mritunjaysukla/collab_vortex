import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/message.dto';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: Repository<Message>);
    create(senderId: string, createMessageDto: CreateMessageDto): Promise<Message>;
    findAll(): Promise<Message[]>;
    findOne(id: string): Promise<Message>;
    findByConversation(conversationId: string, userId: string): Promise<Message[]>;
    findUserConversations(userId: string): Promise<any[]>;
    markAsRead(id: string, userId: string): Promise<Message>;
    markConversationAsRead(conversationId: string, userId: string): Promise<void>;
    remove(id: string, userId: string): Promise<void>;
    findUnreadMessages(userId: string): Promise<Message[]>;
    private generateConversationId;
}

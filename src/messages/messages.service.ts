import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './dto/message.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) { }

  async create(senderId: string, createMessageDto: CreateMessageDto): Promise<Message> {
    const conversationId = createMessageDto.conversationId || this.generateConversationId(senderId, createMessageDto.recipientId);

    const message = this.messageRepository.create({
      ...createMessageDto,
      sender: { id: senderId } as any,
      recipient: { id: createMessageDto.recipientId } as any,
      conversationId,
    });

    return await this.messageRepository.save(message);
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.find({
      relations: ['sender', 'recipient'],
      order: { timestamp: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messageRepository.findOne({
      where: { id },
      relations: ['sender', 'recipient'],
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }

    return message;
  }

  async findByConversation(conversationId: string, userId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: { conversationId },
      relations: ['sender', 'recipient'],
      order: { timestamp: 'ASC' },
    });
  }

  async findUserConversations(userId: string): Promise<any[]> {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.recipient', 'recipient')
      .where('message.senderId = :userId OR message.recipientId = :userId', { userId })
      .orderBy('message.timestamp', 'DESC')
      .getMany();

    // Group by conversation and get latest message for each
    const conversationsMap = new Map();

    messages.forEach(message => {
      const conversationId = message.conversationId;
      if (!conversationsMap.has(conversationId)) {
        const otherUser = message.sender.id === userId ? message.recipient : message.sender;
        conversationsMap.set(conversationId, {
          conversationId,
          otherUser: {
            id: otherUser.id,
            email: otherUser.email,
          },
          latestMessage: message,
          unreadCount: 0,
        });
      }
    });

    // Calculate unread count for each conversation
    for (const conversation of conversationsMap.values()) {
      const unreadCount = await this.messageRepository.count({
        where: {
          conversationId: conversation.conversationId,
          recipient: { id: userId },
          readAt: null,
        },
      });
      conversation.unreadCount = unreadCount;
    }

    return Array.from(conversationsMap.values());
  }

  async markAsRead(id: string, userId: string): Promise<Message> {
    const message = await this.findOne(id);

    if (message.recipient.id !== userId) {
      throw new ForbiddenException('You can only mark your own messages as read');
    }

    if (!message.readAt) {
      message.readAt = new Date();
      return await this.messageRepository.save(message);
    }

    return message;
  }

  async markConversationAsRead(conversationId: string, userId: string): Promise<void> {
    await this.messageRepository.update(
      {
        conversationId,
        recipient: { id: userId },
        readAt: null,
      },
      {
        readAt: new Date(),
      },
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    const message = await this.findOne(id);

    if (message.sender.id !== userId) {
      throw new ForbiddenException('You can only delete your own messages');
    }

    await this.messageRepository.remove(message);
  }

  async findUnreadMessages(userId: string): Promise<Message[]> {
    return await this.messageRepository.find({
      where: {
        recipient: { id: userId },
        readAt: null,
      },
      relations: ['sender', 'recipient'],
      order: { timestamp: 'DESC' },
    });
  }

  private generateConversationId(userId1: string, userId2: string): string {
    // Create consistent conversation ID regardless of order
    const sortedIds = [userId1, userId2].sort();
    return `conv_${sortedIds[0]}_${sortedIds[1]}`;
  }
}

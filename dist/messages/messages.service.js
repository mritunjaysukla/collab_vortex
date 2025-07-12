"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
let MessageService = class MessageService {
    constructor(messageRepository) {
        this.messageRepository = messageRepository;
    }
    async create(senderId, createMessageDto) {
        const conversationId = createMessageDto.conversationId || this.generateConversationId(senderId, createMessageDto.recipientId);
        const message = this.messageRepository.create({
            ...createMessageDto,
            sender: { id: senderId },
            recipient: { id: createMessageDto.recipientId },
            conversationId,
        });
        return await this.messageRepository.save(message);
    }
    async findAll() {
        return await this.messageRepository.find({
            relations: ['sender', 'recipient'],
            order: { timestamp: 'DESC' },
        });
    }
    async findOne(id) {
        const message = await this.messageRepository.findOne({
            where: { id },
            relations: ['sender', 'recipient'],
        });
        if (!message) {
            throw new common_1.NotFoundException(`Message with ID ${id} not found`);
        }
        return message;
    }
    async findByConversation(conversationId, userId) {
        return await this.messageRepository.find({
            where: { conversationId },
            relations: ['sender', 'recipient'],
            order: { timestamp: 'ASC' },
        });
    }
    async findUserConversations(userId) {
        const messages = await this.messageRepository
            .createQueryBuilder('message')
            .leftJoinAndSelect('message.sender', 'sender')
            .leftJoinAndSelect('message.recipient', 'recipient')
            .where('message.senderId = :userId OR message.recipientId = :userId', { userId })
            .orderBy('message.timestamp', 'DESC')
            .getMany();
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
    async markAsRead(id, userId) {
        const message = await this.findOne(id);
        if (message.recipient.id !== userId) {
            throw new common_1.ForbiddenException('You can only mark your own messages as read');
        }
        if (!message.readAt) {
            message.readAt = new Date();
            return await this.messageRepository.save(message);
        }
        return message;
    }
    async markConversationAsRead(conversationId, userId) {
        await this.messageRepository.update({
            conversationId,
            recipient: { id: userId },
            readAt: null,
        }, {
            readAt: new Date(),
        });
    }
    async remove(id, userId) {
        const message = await this.findOne(id);
        if (message.sender.id !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own messages');
        }
        await this.messageRepository.remove(message);
    }
    async findUnreadMessages(userId) {
        return await this.messageRepository.find({
            where: {
                recipient: { id: userId },
                readAt: null,
            },
            relations: ['sender', 'recipient'],
            order: { timestamp: 'DESC' },
        });
    }
    generateConversationId(userId1, userId2) {
        const sortedIds = [userId1, userId2].sort();
        return `conv_${sortedIds[0]}_${sortedIds[1]}`;
    }
};
exports.MessageService = MessageService;
exports.MessageService = MessageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.Message)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MessageService);
//# sourceMappingURL=messages.service.js.map
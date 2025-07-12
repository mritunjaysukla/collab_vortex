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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const messages_service_1 = require("../messages/messages.service");
const notifications_service_1 = require("../notifications/notifications.service");
let ChatGateway = class ChatGateway {
    constructor(jwtService, messageService, notificationService) {
        this.jwtService = jwtService;
        this.messageService = messageService;
        this.notificationService = notificationService;
        this.connectedUsers = new Map();
    }
    async handleConnection(client) {
        try {
            const token = client.handshake.auth.token || client.handshake.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                client.disconnect();
                return;
            }
            const payload = this.jwtService.verify(token);
            client.userId = payload.sub;
            client.userEmail = payload.email;
            this.connectedUsers.set(client.userId, client.id);
            client.join(`user_${client.userId}`);
            console.log(`User ${client.userEmail} connected with socket ${client.id}`);
        }
        catch (error) {
            console.error('WebSocket authentication failed:', error);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        if (client.userId) {
            this.connectedUsers.delete(client.userId);
            console.log(`User ${client.userEmail} disconnected`);
        }
    }
    async handleMessage(data, client) {
        try {
            const message = await this.messageService.create(client.userId, {
                recipientId: data.recipientId,
                text: data.text,
                conversationId: data.conversationId,
            });
            const recipientSocketId = this.connectedUsers.get(data.recipientId);
            if (recipientSocketId) {
                this.server.to(recipientSocketId).emit('newMessage', {
                    id: message.id,
                    text: message.text,
                    senderId: client.userId,
                    senderEmail: client.userEmail,
                    timestamp: message.timestamp,
                    conversationId: message.conversationId,
                });
            }
            client.emit('messageSent', {
                id: message.id,
                status: 'delivered',
            });
            if (!recipientSocketId) {
                await this.notificationService.createMessageReceivedNotification(data.recipientId, message.id, client.userEmail);
            }
            return { success: true, messageId: message.id };
        }
        catch (error) {
            client.emit('messageError', { error: error.message });
            return { success: false, error: error.message };
        }
    }
    async handleMarkAsRead(data, client) {
        try {
            await this.messageService.markAsRead(data.messageId, client.userId);
            const message = await this.messageService.findOne(data.messageId);
            const senderSocketId = this.connectedUsers.get(message.sender.id);
            if (senderSocketId) {
                this.server.to(senderSocketId).emit('messageRead', {
                    messageId: data.messageId,
                    readBy: client.userId,
                });
            }
            return { success: true };
        }
        catch (error) {
            return { success: false, error: error.message };
        }
    }
    async handleJoinConversation(data, client) {
        client.join(`conversation_${data.conversationId}`);
        return { success: true };
    }
    async handleLeaveConversation(data, client) {
        client.leave(`conversation_${data.conversationId}`);
        return { success: true };
    }
    async handleGetUserStatus(data) {
        const isOnline = this.connectedUsers.has(data.userId);
        return { userId: data.userId, online: isOnline };
    }
    async sendNotificationToUser(userId, notification) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('notification', notification);
        }
    }
    async sendUpdateToUser(userId, update) {
        const socketId = this.connectedUsers.get(userId);
        if (socketId) {
            this.server.to(socketId).emit('update', update);
        }
    }
    getOnlineUsersCount() {
        return this.connectedUsers.size;
    }
    isUserOnline(userId) {
        return this.connectedUsers.has(userId);
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markAsRead'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkAsRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinConversation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveConversation'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveConversation", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getUserStatus'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleGetUserStatus", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        messages_service_1.MessageService,
        notifications_service_1.NotificationService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map
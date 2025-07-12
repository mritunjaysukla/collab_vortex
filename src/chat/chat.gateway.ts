import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Injectable, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from '../messages/messages.service';
import { NotificationService } from '../notifications/notifications.service';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userEmail?: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private connectedUsers = new Map<string, string>(); // userId -> socketId

  constructor(
    private jwtService: JwtService,
    private messageService: MessageService,
    private notificationService: NotificationService,
  ) { }

  async handleConnection(client: AuthenticatedSocket) {
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

      // Join user to their personal room for notifications
      client.join(`user_${client.userId}`);

      console.log(`User ${client.userEmail} connected with socket ${client.id}`);
    } catch (error) {
      console.error('WebSocket authentication failed:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      this.connectedUsers.delete(client.userId);
      console.log(`User ${client.userEmail} disconnected`);
    }
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { recipientId: string; text: string; conversationId?: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      // Create message in database
      const message = await this.messageService.create(client.userId, {
        recipientId: data.recipientId,
        text: data.text,
        conversationId: data.conversationId,
      });

      // Send to recipient if online
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

      // Send confirmation to sender
      client.emit('messageSent', {
        id: message.id,
        status: 'delivered',
      });

      // Create notification if recipient is offline
      if (!recipientSocketId) {
        await this.notificationService.createMessageReceivedNotification(
          data.recipientId,
          message.id,
          client.userEmail,
        );
      }

      return { success: true, messageId: message.id };
    } catch (error) {
      client.emit('messageError', { error: error.message });
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('markAsRead')
  async handleMarkAsRead(
    @MessageBody() data: { messageId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    try {
      await this.messageService.markAsRead(data.messageId, client.userId);

      // Notify sender that message was read
      const message = await this.messageService.findOne(data.messageId);
      const senderSocketId = this.connectedUsers.get(message.sender.id);
      if (senderSocketId) {
        this.server.to(senderSocketId).emit('messageRead', {
          messageId: data.messageId,
          readBy: client.userId,
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.join(`conversation_${data.conversationId}`);
    return { success: true };
  }

  @SubscribeMessage('leaveConversation')
  async handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    client.leave(`conversation_${data.conversationId}`);
    return { success: true };
  }

  @SubscribeMessage('getUserStatus')
  async handleGetUserStatus(
    @MessageBody() data: { userId: string },
  ) {
    const isOnline = this.connectedUsers.has(data.userId);
    return { userId: data.userId, online: isOnline };
  }

  // Method to send notifications to specific users
  async sendNotificationToUser(userId: string, notification: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('notification', notification);
    }
  }

  // Method to send real-time updates for campaigns, proposals, etc.
  async sendUpdateToUser(userId: string, update: any) {
    const socketId = this.connectedUsers.get(userId);
    if (socketId) {
      this.server.to(socketId).emit('update', update);
    }
  }

  // Get online users count
  getOnlineUsersCount(): number {
    return this.connectedUsers.size;
  }

  // Check if user is online
  isUserOnline(userId: string): boolean {
    return this.connectedUsers.has(userId);
  }
}

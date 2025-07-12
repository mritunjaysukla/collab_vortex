import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessageService } from '../messages/messages.service';
import { NotificationService } from '../notifications/notifications.service';
interface AuthenticatedSocket extends Socket {
    userId?: string;
    userEmail?: string;
}
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private jwtService;
    private messageService;
    private notificationService;
    server: Server;
    private connectedUsers;
    constructor(jwtService: JwtService, messageService: MessageService, notificationService: NotificationService);
    handleConnection(client: AuthenticatedSocket): Promise<void>;
    handleDisconnect(client: AuthenticatedSocket): void;
    handleMessage(data: {
        recipientId: string;
        text: string;
        conversationId?: string;
    }, client: AuthenticatedSocket): Promise<{
        success: boolean;
        messageId: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        messageId?: undefined;
    }>;
    handleMarkAsRead(data: {
        messageId: string;
    }, client: AuthenticatedSocket): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleJoinConversation(data: {
        conversationId: string;
    }, client: AuthenticatedSocket): Promise<{
        success: boolean;
    }>;
    handleLeaveConversation(data: {
        conversationId: string;
    }, client: AuthenticatedSocket): Promise<{
        success: boolean;
    }>;
    handleGetUserStatus(data: {
        userId: string;
    }): Promise<{
        userId: string;
        online: boolean;
    }>;
    sendNotificationToUser(userId: string, notification: any): Promise<void>;
    sendUpdateToUser(userId: string, update: any): Promise<void>;
    getOnlineUsersCount(): number;
    isUserOnline(userId: string): boolean;
}
export {};

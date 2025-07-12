import { NotificationService } from './notifications.service';
import { CreateNotificationDto } from './dto/notification.dto';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    create(createNotificationDto: CreateNotificationDto): Promise<import("./entities/notification.entity").Notification>;
    findUserNotifications(req: any, limit?: number): Promise<import("./entities/notification.entity").Notification[]>;
    getUnreadNotifications(req: any): Promise<import("./entities/notification.entity").Notification[]>;
    getUnreadCount(req: any): Promise<{
        count: number;
    }>;
    findOne(id: string): Promise<import("./entities/notification.entity").Notification>;
    markAsRead(id: string, req: any): Promise<import("./entities/notification.entity").Notification>;
    markAllAsRead(req: any): Promise<{
        message: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}

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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notifications_service_1 = require("./notifications.service");
const notification_dto_1 = require("./dto/notification.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async create(createNotificationDto) {
        return await this.notificationService.create(createNotificationDto);
    }
    async findUserNotifications(req, limit) {
        return await this.notificationService.findByUser(req.user.id, limit);
    }
    async getUnreadNotifications(req) {
        return await this.notificationService.findUnreadByUser(req.user.id);
    }
    async getUnreadCount(req) {
        const count = await this.notificationService.getUnreadCount(req.user.id);
        return { count };
    }
    async findOne(id) {
        return await this.notificationService.findOne(id);
    }
    async markAsRead(id, req) {
        return await this.notificationService.markAsRead(id, req.user.id);
    }
    async markAllAsRead(req) {
        await this.notificationService.markAllAsRead(req.user.id);
        return { message: 'All notifications marked as read' };
    }
    async remove(id, req) {
        await this.notificationService.remove(id, req.user.id);
        return { message: 'Notification deleted successfully' };
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new notification (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Notification created successfully', type: notification_dto_1.NotificationResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dto_1.CreateNotificationDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved user notifications', type: [notification_dto_1.NotificationResponseDto] }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Number of notifications to retrieve (default: 50)' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findUserNotifications", null);
__decorate([
    (0, common_1.Get)('unread'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unread notifications' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved unread notifications', type: [notification_dto_1.NotificationResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadNotifications", null);
__decorate([
    (0, common_1.Get)('unread/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unread notifications count' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved unread count', schema: { example: { count: 5 } } }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getUnreadCount", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific notification' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved notification', type: notification_dto_1.NotificationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark notification as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification marked as read', type: notification_dto_1.NotificationResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('mark-all-read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all notifications as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'All notifications marked as read' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "markAllAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a notification' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Notification deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "remove", null);
exports.NotificationController = NotificationController = __decorate([
    (0, swagger_1.ApiTags)('notifications'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notifications.controller.js.map
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { NotificationService } from './notifications.service';
import { CreateNotificationDto, NotificationResponseDto } from './dto/notification.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('notifications')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new notification (admin only)' })
  @ApiResponse({ status: 201, description: 'Notification created successfully', type: NotificationResponseDto })
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return await this.notificationService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user notifications' })
  @ApiResponse({ status: 200, description: 'Retrieved user notifications', type: [NotificationResponseDto] })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of notifications to retrieve (default: 50)' })
  async findUserNotifications(
    @Request() req,
    @Query('limit') limit?: number,
  ) {
    return await this.notificationService.findByUser(req.user.id, limit);
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get unread notifications' })
  @ApiResponse({ status: 200, description: 'Retrieved unread notifications', type: [NotificationResponseDto] })
  async getUnreadNotifications(@Request() req) {
    return await this.notificationService.findUnreadByUser(req.user.id);
  }

  @Get('unread/count')
  @ApiOperation({ summary: 'Get unread notifications count' })
  @ApiResponse({ status: 200, description: 'Retrieved unread count', schema: { example: { count: 5 } } })
  async getUnreadCount(@Request() req) {
    const count = await this.notificationService.getUnreadCount(req.user.id);
    return { count };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific notification' })
  @ApiResponse({ status: 200, description: 'Retrieved notification', type: NotificationResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.notificationService.findOne(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark notification as read' })
  @ApiResponse({ status: 200, description: 'Notification marked as read', type: NotificationResponseDto })
  async markAsRead(@Param('id') id: string, @Request() req) {
    return await this.notificationService.markAsRead(id, req.user.id);
  }

  @Patch('mark-all-read')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  @ApiResponse({ status: 200, description: 'All notifications marked as read' })
  async markAllAsRead(@Request() req) {
    await this.notificationService.markAllAsRead(req.user.id);
    return { message: 'All notifications marked as read' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a notification' })
  @ApiResponse({ status: 200, description: 'Notification deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.notificationService.remove(id, req.user.id);
    return { message: 'Notification deleted successfully' };
  }
}

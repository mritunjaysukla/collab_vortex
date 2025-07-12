import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { EmailService } from '../common/services/email.service';
import { NotificationType } from '../common/enums';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
    private readonly emailService: EmailService,
  ) { }

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = this.notificationRepository.create({
      ...createNotificationDto,
      user: { id: createNotificationDto.userId } as any,
    });

    const savedNotification = await this.notificationRepository.save(notification);

    // Send email notification for important events
    await this.sendEmailNotificationIfNeeded(savedNotification);

    return savedNotification;
  }

  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string, limit = 50): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async findUnreadByUser(userId: string): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: {
        user: { id: userId },
        read: false,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.notificationRepository.count({
      where: {
        user: { id: userId },
        read: false,
      },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!notification) {
      throw new NotFoundException(`Notification with ID ${id} not found`);
    }

    return notification;
  }

  async markAsRead(id: string, userId: string): Promise<Notification> {
    const notification = await this.findOne(id);

    if (notification.user.id !== userId) {
      throw new NotFoundException('Notification not found');
    }

    notification.read = true;
    return await this.notificationRepository.save(notification);
  }

  async markAllAsRead(userId: string): Promise<void> {
    await this.notificationRepository.update(
      { user: { id: userId }, read: false },
      { read: true },
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    const notification = await this.findOne(id);

    if (notification.user.id !== userId) {
      throw new NotFoundException('Notification not found');
    }

    await this.notificationRepository.remove(notification);
  }

  // Helper methods for creating specific notification types
  async createCampaignNotification(userId: string, campaignId: string, campaignTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `New campaign "${campaignTitle}" matches your profile`,
      type: NotificationType.NEW_CAMPAIGN,
      metadata: { campaignId },
      actionUrl: `/campaigns/${campaignId}`,
    });
  }

  async createProposalNotification(userId: string, proposalId: string, campaignTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `You received a new proposal for "${campaignTitle}"`,
      type: NotificationType.PROPOSAL_RECEIVED,
      metadata: { proposalId },
      actionUrl: `/proposals/${proposalId}`,
    });
  }

  async createProposalAcceptedNotification(userId: string, proposalId: string, campaignTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `Your proposal for "${campaignTitle}" has been accepted!`,
      type: NotificationType.PROPOSAL_ACCEPTED,
      metadata: { proposalId },
      actionUrl: `/proposals/${proposalId}`,
    });
  }

  async createProposalRejectedNotification(userId: string, proposalId: string, campaignTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `Your proposal for "${campaignTitle}" has been rejected`,
      type: NotificationType.PROPOSAL_REJECTED,
      metadata: { proposalId },
      actionUrl: `/proposals/${proposalId}`,
    });
  }

  async createContractReadyNotification(userId: string, collaborationId: string): Promise<Notification> {
    return this.create({
      userId,
      message: 'Your contract is ready for signature',
      type: NotificationType.CONTRACT_READY,
      metadata: { collaborationId },
      actionUrl: `/collaborations/${collaborationId}/contract`,
    });
  }

  async createDeliverableSubmittedNotification(userId: string, deliverableId: string, deliverableTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `Deliverable "${deliverableTitle}" has been submitted for review`,
      type: NotificationType.DELIVERABLE_SUBMITTED,
      metadata: { deliverableId },
      actionUrl: `/deliverables/${deliverableId}`,
    });
  }

  async createDeliverableApprovedNotification(userId: string, deliverableId: string, deliverableTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `Your deliverable "${deliverableTitle}" has been approved!`,
      type: NotificationType.DELIVERABLE_APPROVED,
      metadata: { deliverableId },
      actionUrl: `/deliverables/${deliverableId}`,
    });
  }

  async createPaymentReceivedNotification(userId: string, amount: number, collaborationId: string): Promise<Notification> {
    return this.create({
      userId,
      message: `You received a payment of $${amount}`,
      type: NotificationType.PAYMENT_RECEIVED,
      metadata: { collaborationId, amount },
      actionUrl: `/collaborations/${collaborationId}/payments`,
    });
  }

  async createMessageReceivedNotification(userId: string, messageId: string, senderName: string): Promise<Notification> {
    return this.create({
      userId,
      message: `You received a new message from ${senderName}`,
      type: NotificationType.MESSAGE_RECEIVED,
      metadata: { messageId },
      actionUrl: `/messages`,
    });
  }

  async createCollaborationCompletedNotification(userId: string, collaborationId: string, campaignTitle: string): Promise<Notification> {
    return this.create({
      userId,
      message: `Collaboration for "${campaignTitle}" has been completed!`,
      type: NotificationType.COLLABORATION_COMPLETED,
      metadata: { collaborationId },
      actionUrl: `/collaborations/${collaborationId}`,
    });
  }

  private async sendEmailNotificationIfNeeded(notification: Notification): Promise<void> {
    // Only send emails for important notifications
    const emailNotificationTypes = [
      NotificationType.PROPOSAL_ACCEPTED,
      NotificationType.CONTRACT_READY,
      NotificationType.PAYMENT_RECEIVED,
      NotificationType.COLLABORATION_COMPLETED,
    ];

    if (emailNotificationTypes.includes(notification.type)) {
      try {
        // Get user email (you might need to fetch user details)
        const user = await this.notificationRepository
          .createQueryBuilder('notification')
          .leftJoinAndSelect('notification.user', 'user')
          .where('notification.id = :id', { id: notification.id })
          .getOne();

        if (user?.user?.email) {
          await this.emailService.sendNotificationEmail(
            user.user.email,
            this.getEmailSubject(notification.type),
            notification.message,
          );
        }
      } catch (error) {
        console.error('Failed to send email notification:', error);
        // Don't throw error to avoid breaking notification creation
      }
    }
  }

  private getEmailSubject(type: NotificationType): string {
    const subjects = {
      [NotificationType.NEW_CAMPAIGN]: 'New Campaign Available',
      [NotificationType.PROPOSAL_RECEIVED]: 'New Proposal Received',
      [NotificationType.PROPOSAL_ACCEPTED]: 'Proposal Accepted!',
      [NotificationType.PROPOSAL_REJECTED]: 'Proposal Update',
      [NotificationType.CONTRACT_READY]: 'Contract Ready for Signature',
      [NotificationType.DELIVERABLE_SUBMITTED]: 'Deliverable Submitted',
      [NotificationType.DELIVERABLE_APPROVED]: 'Deliverable Approved!',
      [NotificationType.PAYMENT_RECEIVED]: 'Payment Received!',
      [NotificationType.MESSAGE_RECEIVED]: 'New Message',
      [NotificationType.COLLABORATION_COMPLETED]: 'Collaboration Completed!',
    };

    return subjects[type] || 'CollabVortex Notification';
  }
}

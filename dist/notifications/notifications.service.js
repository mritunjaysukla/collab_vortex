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
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const email_service_1 = require("../common/services/email.service");
const enums_1 = require("../common/enums");
let NotificationService = class NotificationService {
    constructor(notificationRepository, emailService) {
        this.notificationRepository = notificationRepository;
        this.emailService = emailService;
    }
    async create(createNotificationDto) {
        const notification = this.notificationRepository.create({
            ...createNotificationDto,
            user: { id: createNotificationDto.userId },
        });
        const savedNotification = await this.notificationRepository.save(notification);
        await this.sendEmailNotificationIfNeeded(savedNotification);
        return savedNotification;
    }
    async findAll() {
        return await this.notificationRepository.find({
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByUser(userId, limit = 50) {
        return await this.notificationRepository.find({
            where: { user: { id: userId } },
            order: { createdAt: 'DESC' },
            take: limit,
        });
    }
    async findUnreadByUser(userId) {
        return await this.notificationRepository.find({
            where: {
                user: { id: userId },
                read: false,
            },
            order: { createdAt: 'DESC' },
        });
    }
    async getUnreadCount(userId) {
        return await this.notificationRepository.count({
            where: {
                user: { id: userId },
                read: false,
            },
        });
    }
    async findOne(id) {
        const notification = await this.notificationRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!notification) {
            throw new common_1.NotFoundException(`Notification with ID ${id} not found`);
        }
        return notification;
    }
    async markAsRead(id, userId) {
        const notification = await this.findOne(id);
        if (notification.user.id !== userId) {
            throw new common_1.NotFoundException('Notification not found');
        }
        notification.read = true;
        return await this.notificationRepository.save(notification);
    }
    async markAllAsRead(userId) {
        await this.notificationRepository.update({ user: { id: userId }, read: false }, { read: true });
    }
    async remove(id, userId) {
        const notification = await this.findOne(id);
        if (notification.user.id !== userId) {
            throw new common_1.NotFoundException('Notification not found');
        }
        await this.notificationRepository.remove(notification);
    }
    async createCampaignNotification(userId, campaignId, campaignTitle) {
        return this.create({
            userId,
            message: `New campaign "${campaignTitle}" matches your profile`,
            type: enums_1.NotificationType.NEW_CAMPAIGN,
            metadata: { campaignId },
            actionUrl: `/campaigns/${campaignId}`,
        });
    }
    async createProposalNotification(userId, proposalId, campaignTitle) {
        return this.create({
            userId,
            message: `You received a new proposal for "${campaignTitle}"`,
            type: enums_1.NotificationType.PROPOSAL_RECEIVED,
            metadata: { proposalId },
            actionUrl: `/proposals/${proposalId}`,
        });
    }
    async createProposalAcceptedNotification(userId, proposalId, campaignTitle) {
        return this.create({
            userId,
            message: `Your proposal for "${campaignTitle}" has been accepted!`,
            type: enums_1.NotificationType.PROPOSAL_ACCEPTED,
            metadata: { proposalId },
            actionUrl: `/proposals/${proposalId}`,
        });
    }
    async createProposalRejectedNotification(userId, proposalId, campaignTitle) {
        return this.create({
            userId,
            message: `Your proposal for "${campaignTitle}" has been rejected`,
            type: enums_1.NotificationType.PROPOSAL_REJECTED,
            metadata: { proposalId },
            actionUrl: `/proposals/${proposalId}`,
        });
    }
    async createContractReadyNotification(userId, collaborationId) {
        return this.create({
            userId,
            message: 'Your contract is ready for signature',
            type: enums_1.NotificationType.CONTRACT_READY,
            metadata: { collaborationId },
            actionUrl: `/collaborations/${collaborationId}/contract`,
        });
    }
    async createDeliverableSubmittedNotification(userId, deliverableId, deliverableTitle) {
        return this.create({
            userId,
            message: `Deliverable "${deliverableTitle}" has been submitted for review`,
            type: enums_1.NotificationType.DELIVERABLE_SUBMITTED,
            metadata: { deliverableId },
            actionUrl: `/deliverables/${deliverableId}`,
        });
    }
    async createDeliverableApprovedNotification(userId, deliverableId, deliverableTitle) {
        return this.create({
            userId,
            message: `Your deliverable "${deliverableTitle}" has been approved!`,
            type: enums_1.NotificationType.DELIVERABLE_APPROVED,
            metadata: { deliverableId },
            actionUrl: `/deliverables/${deliverableId}`,
        });
    }
    async createPaymentReceivedNotification(userId, amount, collaborationId) {
        return this.create({
            userId,
            message: `You received a payment of $${amount}`,
            type: enums_1.NotificationType.PAYMENT_RECEIVED,
            metadata: { collaborationId, amount },
            actionUrl: `/collaborations/${collaborationId}/payments`,
        });
    }
    async createMessageReceivedNotification(userId, messageId, senderName) {
        return this.create({
            userId,
            message: `You received a new message from ${senderName}`,
            type: enums_1.NotificationType.MESSAGE_RECEIVED,
            metadata: { messageId },
            actionUrl: `/messages`,
        });
    }
    async createCollaborationCompletedNotification(userId, collaborationId, campaignTitle) {
        return this.create({
            userId,
            message: `Collaboration for "${campaignTitle}" has been completed!`,
            type: enums_1.NotificationType.COLLABORATION_COMPLETED,
            metadata: { collaborationId },
            actionUrl: `/collaborations/${collaborationId}`,
        });
    }
    async sendEmailNotificationIfNeeded(notification) {
        const emailNotificationTypes = [
            enums_1.NotificationType.PROPOSAL_ACCEPTED,
            enums_1.NotificationType.CONTRACT_READY,
            enums_1.NotificationType.PAYMENT_RECEIVED,
            enums_1.NotificationType.COLLABORATION_COMPLETED,
        ];
        if (emailNotificationTypes.includes(notification.type)) {
            try {
                const user = await this.notificationRepository
                    .createQueryBuilder('notification')
                    .leftJoinAndSelect('notification.user', 'user')
                    .where('notification.id = :id', { id: notification.id })
                    .getOne();
                if (user?.user?.email) {
                    await this.emailService.sendNotificationEmail(user.user.email, this.getEmailSubject(notification.type), notification.message);
                }
            }
            catch (error) {
                console.error('Failed to send email notification:', error);
            }
        }
    }
    getEmailSubject(type) {
        const subjects = {
            [enums_1.NotificationType.NEW_CAMPAIGN]: 'New Campaign Available',
            [enums_1.NotificationType.PROPOSAL_RECEIVED]: 'New Proposal Received',
            [enums_1.NotificationType.PROPOSAL_ACCEPTED]: 'Proposal Accepted!',
            [enums_1.NotificationType.PROPOSAL_REJECTED]: 'Proposal Update',
            [enums_1.NotificationType.CONTRACT_READY]: 'Contract Ready for Signature',
            [enums_1.NotificationType.DELIVERABLE_SUBMITTED]: 'Deliverable Submitted',
            [enums_1.NotificationType.DELIVERABLE_APPROVED]: 'Deliverable Approved!',
            [enums_1.NotificationType.PAYMENT_RECEIVED]: 'Payment Received!',
            [enums_1.NotificationType.MESSAGE_RECEIVED]: 'New Message',
            [enums_1.NotificationType.COLLABORATION_COMPLETED]: 'Collaboration Completed!',
        };
        return subjects[type] || 'CollabVortex Notification';
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        email_service_1.EmailService])
], NotificationService);
//# sourceMappingURL=notifications.service.js.map
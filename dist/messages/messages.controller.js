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
exports.MessageController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const messages_service_1 = require("./messages.service");
const message_dto_1 = require("./dto/message.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async create(req, createMessageDto) {
        return await this.messageService.create(req.user.id, createMessageDto);
    }
    async findAll() {
        return await this.messageService.findAll();
    }
    async getUserConversations(req) {
        return await this.messageService.findUserConversations(req.user.id);
    }
    async getUnreadMessages(req) {
        return await this.messageService.findUnreadMessages(req.user.id);
    }
    async getConversationMessages(conversationId, req) {
        return await this.messageService.findByConversation(conversationId, req.user.id);
    }
    async findOne(id) {
        return await this.messageService.findOne(id);
    }
    async markAsRead(id, req) {
        return await this.messageService.markAsRead(id, req.user.id);
    }
    async markConversationAsRead(conversationId, req) {
        await this.messageService.markConversationAsRead(conversationId, req.user.id);
        return { message: 'Conversation marked as read' };
    }
    async remove(id, req) {
        await this.messageService.remove(id, req.user.id);
        return { message: 'Message deleted successfully' };
    }
};
exports.MessageController = MessageController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Send a new message' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message sent successfully', type: message_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, message_dto_1.CreateMessageDto]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all messages (admin only)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved all messages', type: [message_dto_1.MessageResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('conversations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user conversations' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved user conversations' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getUserConversations", null);
__decorate([
    (0, common_1.Get)('unread'),
    (0, swagger_1.ApiOperation)({ summary: 'Get unread messages' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved unread messages', type: [message_dto_1.MessageResponseDto] }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getUnreadMessages", null);
__decorate([
    (0, common_1.Get)('conversation/:conversationId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get messages in a conversation' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved conversation messages', type: [message_dto_1.MessageResponseDto] }),
    __param(0, (0, common_1.Param)('conversationId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "getConversationMessages", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Retrieved message', type: message_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark message as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message marked as read', type: message_dto_1.MessageResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)('conversation/:conversationId/read'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark all messages in conversation as read' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Conversation marked as read' }),
    __param(0, (0, common_1.Param)('conversationId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "markConversationAsRead", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a message' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Message deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "remove", null);
exports.MessageController = MessageController = __decorate([
    (0, swagger_1.ApiTags)('messages'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('messages'),
    __metadata("design:paramtypes", [messages_service_1.MessageService])
], MessageController);
//# sourceMappingURL=messages.controller.js.map
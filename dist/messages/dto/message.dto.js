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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageResponseDto = exports.UpdateMessageDto = exports.CreateMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateMessageDto {
}
exports.CreateMessageDto = CreateMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-recipient-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "recipientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello! I would like to discuss the campaign details.' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/attachment.pdf', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "attachmentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'conv-uuid-123', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMessageDto.prototype, "conversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateMessageDto.prototype, "isSystemMessage", void 0);
class UpdateMessageDto extends (0, swagger_1.PartialType)(CreateMessageDto) {
}
exports.UpdateMessageDto = UpdateMessageDto;
class MessageResponseDto {
}
exports.MessageResponseDto = MessageResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-message-id' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-sender-id' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "senderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-recipient-id' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "recipientId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello! I would like to discuss the campaign details.' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://example.com/attachment.pdf' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "attachmentUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MessageResponseDto.prototype, "readAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], MessageResponseDto.prototype, "isSystemMessage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'conv-uuid-123' }),
    __metadata("design:type", String)
], MessageResponseDto.prototype, "conversationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MessageResponseDto.prototype, "timestamp", void 0);
//# sourceMappingURL=message.dto.js.map
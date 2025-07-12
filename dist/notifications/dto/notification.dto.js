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
exports.NotificationResponseDto = exports.UpdateNotificationDto = exports.CreateNotificationDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../common/enums");
class CreateNotificationDto {
}
exports.CreateNotificationDto = CreateNotificationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'You have a new proposal for your campaign' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.NotificationType, example: enums_1.NotificationType.PROPOSAL_RECEIVED }),
    (0, class_validator_1.IsEnum)(enums_1.NotificationType),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { campaignId: 'uuid-campaign-id', proposalId: 'uuid-proposal-id' },
        required: false
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateNotificationDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/campaigns/uuid-campaign-id', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateNotificationDto.prototype, "actionUrl", void 0);
class UpdateNotificationDto extends (0, swagger_1.PartialType)(CreateNotificationDto) {
}
exports.UpdateNotificationDto = UpdateNotificationDto;
class NotificationResponseDto {
}
exports.NotificationResponseDto = NotificationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-notification-id' }),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-user-id' }),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'You have a new proposal for your campaign' }),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.NotificationType, example: enums_1.NotificationType.PROPOSAL_RECEIVED }),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], NotificationResponseDto.prototype, "read", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: { campaignId: 'uuid-campaign-id' } }),
    __metadata("design:type", Object)
], NotificationResponseDto.prototype, "metadata", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '/campaigns/uuid-campaign-id' }),
    __metadata("design:type", String)
], NotificationResponseDto.prototype, "actionUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], NotificationResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=notification.dto.js.map
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
exports.CollaborationResponseDto = exports.UpdateCollaborationDto = exports.CreateCollaborationDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("../../common/enums");
class CreateCollaborationDto {
}
exports.CreateCollaborationDto = CreateCollaborationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-campaign-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCollaborationDto.prototype, "campaignId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-proposal-id' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateCollaborationDto.prototype, "proposalId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-15' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCollaborationDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-30' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCollaborationDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Initial collaboration notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCollaborationDto.prototype, "notes", void 0);
class UpdateCollaborationDto {
}
exports.UpdateCollaborationDto = UpdateCollaborationDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-01' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCollaborationDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-08-15' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateCollaborationDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.CollaborationStatus }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(enums_1.CollaborationStatus),
    __metadata("design:type", String)
], UpdateCollaborationDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateCollaborationDto.prototype, "isCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Updated collaboration notes' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCollaborationDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.75, description: 'Progress from 0.0 to 1.0' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1),
    __metadata("design:type", Number)
], UpdateCollaborationDto.prototype, "progress", void 0);
class CollaborationResponseDto {
}
exports.CollaborationResponseDto = CollaborationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-string' }),
    __metadata("design:type", String)
], CollaborationResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-15' }),
    __metadata("design:type", Date)
], CollaborationResponseDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-07-30' }),
    __metadata("design:type", Date)
], CollaborationResponseDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: enums_1.CollaborationStatus }),
    __metadata("design:type", String)
], CollaborationResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], CollaborationResponseDto.prototype, "isCompleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Collaboration notes' }),
    __metadata("design:type", String)
], CollaborationResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.50 }),
    __metadata("design:type", Number)
], CollaborationResponseDto.prototype, "progress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CollaborationResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CollaborationResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=collaboration.dto.js.map
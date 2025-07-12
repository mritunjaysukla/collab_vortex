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
exports.ContractResponseDto = exports.UpdateContractDto = exports.CreateContractDto = exports.ContractStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["DRAFT"] = "draft";
    ContractStatus["PENDING_SIGNATURE"] = "pending_signature";
    ContractStatus["SIGNED"] = "signed";
    ContractStatus["ACTIVE"] = "active";
    ContractStatus["COMPLETED"] = "completed";
    ContractStatus["CANCELLED"] = "cancelled";
})(ContractStatus || (exports.ContractStatus = ContractStatus = {}));
class CreateContractDto {
}
exports.CreateContractDto = CreateContractDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract terms and conditions' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContractDto.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract milestones', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], CreateContractDto.prototype, "milestones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional terms', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateContractDto.prototype, "additionalTerms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Collaboration ID' }),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateContractDto.prototype, "collaborationId", void 0);
class UpdateContractDto {
}
exports.UpdateContractDto = UpdateContractDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract terms and conditions', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateContractDto.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract milestones', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], UpdateContractDto.prototype, "milestones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ContractStatus, description: 'Contract status', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(ContractStatus),
    __metadata("design:type", String)
], UpdateContractDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether contract is approved', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateContractDto.prototype, "approved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creator signature', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateContractDto.prototype, "creatorSignature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand signature', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateContractDto.prototype, "brandSignature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional terms', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateContractDto.prototype, "additionalTerms", void 0);
class ContractResponseDto {
}
exports.ContractResponseDto = ContractResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract ID' }),
    __metadata("design:type", String)
], ContractResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract terms and conditions' }),
    __metadata("design:type", String)
], ContractResponseDto.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Contract milestones' }),
    __metadata("design:type", Object)
], ContractResponseDto.prototype, "milestones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When contract was signed' }),
    __metadata("design:type", Date)
], ContractResponseDto.prototype, "signedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ContractStatus, description: 'Contract status' }),
    __metadata("design:type", String)
], ContractResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Whether contract is approved' }),
    __metadata("design:type", Boolean)
], ContractResponseDto.prototype, "approved", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creator signature' }),
    __metadata("design:type", String)
], ContractResponseDto.prototype, "creatorSignature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Brand signature' }),
    __metadata("design:type", String)
], ContractResponseDto.prototype, "brandSignature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Additional terms' }),
    __metadata("design:type", String)
], ContractResponseDto.prototype, "additionalTerms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When contract was created' }),
    __metadata("design:type", Date)
], ContractResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'When contract was last updated' }),
    __metadata("design:type", Date)
], ContractResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated collaboration' }),
    __metadata("design:type", Object)
], ContractResponseDto.prototype, "collaboration", void 0);
//# sourceMappingURL=contract.dto.js.map
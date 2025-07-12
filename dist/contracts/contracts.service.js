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
exports.ContractService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contract_entity_1 = require("./entities/contract.entity");
const contract_dto_1 = require("./dto/contract.dto");
let ContractService = class ContractService {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async create(createContractDto) {
        const { collaborationId, ...contractData } = createContractDto;
        const contract = new contract_entity_1.Contract();
        contract.terms = contractData.terms;
        contract.milestones = contractData.milestones;
        contract.additionalTerms = contractData.additionalTerms;
        contract.collaboration = { id: collaborationId };
        return await this.contractRepository.save(contract);
    }
    async findAll() {
        return await this.contractRepository.find({
            relations: ['collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findByCollaboration(collaborationId) {
        const contract = await this.contractRepository.findOne({
            where: { collaboration: { id: collaborationId } },
            relations: ['collaboration'],
        });
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found for this collaboration');
        }
        return contract;
    }
    async findByStatus(status) {
        return await this.contractRepository.find({
            where: { status },
            relations: ['collaboration'],
            order: { createdAt: 'DESC' },
        });
    }
    async findOne(id) {
        const contract = await this.contractRepository.findOne({
            where: { id },
            relations: ['collaboration'],
        });
        if (!contract) {
            throw new common_1.NotFoundException('Contract not found');
        }
        return contract;
    }
    async update(id, updateContractDto) {
        const contract = await this.findOne(id);
        Object.assign(contract, updateContractDto);
        if (contract.creatorSignature && contract.brandSignature && contract.status === contract_dto_1.ContractStatus.PENDING_SIGNATURE) {
            contract.status = contract_dto_1.ContractStatus.SIGNED;
            contract.signedAt = new Date();
        }
        return await this.contractRepository.save(contract);
    }
    async signContract(id, signature, userRole) {
        const contract = await this.findOne(id);
        if (userRole === 'creator') {
            contract.creatorSignature = signature;
        }
        else {
            contract.brandSignature = signature;
        }
        if (contract.creatorSignature && contract.brandSignature) {
            contract.status = contract_dto_1.ContractStatus.SIGNED;
            contract.signedAt = new Date();
        }
        return await this.contractRepository.save(contract);
    }
    async approve(id) {
        const contract = await this.findOne(id);
        contract.approved = true;
        contract.status = contract_dto_1.ContractStatus.ACTIVE;
        return await this.contractRepository.save(contract);
    }
    async complete(id) {
        const contract = await this.findOne(id);
        contract.status = contract_dto_1.ContractStatus.COMPLETED;
        return await this.contractRepository.save(contract);
    }
    async cancel(id) {
        const contract = await this.findOne(id);
        contract.status = contract_dto_1.ContractStatus.CANCELLED;
        return await this.contractRepository.save(contract);
    }
    async remove(id) {
        const contract = await this.findOne(id);
        await this.contractRepository.remove(contract);
    }
};
exports.ContractService = ContractService;
exports.ContractService = ContractService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_entity_1.Contract)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContractService);
//# sourceMappingURL=contracts.service.js.map
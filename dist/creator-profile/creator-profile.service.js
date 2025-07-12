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
exports.CreatorProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const creator_profile_entity_1 = require("./entities/creator-profile.entity");
let CreatorProfileService = class CreatorProfileService {
    constructor(creatorProfileRepository) {
        this.creatorProfileRepository = creatorProfileRepository;
    }
    async create(userId, createCreatorProfileDto) {
        const profile = this.creatorProfileRepository.create({
            ...createCreatorProfileDto,
            user: { id: userId },
        });
        return await this.creatorProfileRepository.save(profile);
    }
    async findAll() {
        return await this.creatorProfileRepository.find({
            relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
        });
    }
    async findOne(id) {
        const profile = await this.creatorProfileRepository.findOne({
            where: { id },
            relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Creator profile with ID ${id} not found`);
        }
        return profile;
    }
    async findByUserId(userId) {
        return await this.creatorProfileRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'proposals', 'platformIntegrations', 'analytics'],
        });
    }
    async update(id, updateCreatorProfileDto) {
        const profile = await this.findOne(id);
        Object.assign(profile, updateCreatorProfileDto);
        return await this.creatorProfileRepository.save(profile);
    }
    async remove(id) {
        const profile = await this.findOne(id);
        await this.creatorProfileRepository.remove(profile);
    }
    async findVerifiedCreators() {
        return await this.creatorProfileRepository.find({
            where: { isVerified: true },
            relations: ['user'],
        });
    }
    async findByNiches(niches) {
        return await this.creatorProfileRepository
            .createQueryBuilder('creator')
            .leftJoinAndSelect('creator.user', 'user')
            .where('creator.niches && :niches', { niches })
            .getMany();
    }
};
exports.CreatorProfileService = CreatorProfileService;
exports.CreatorProfileService = CreatorProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(creator_profile_entity_1.CreatorProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CreatorProfileService);
//# sourceMappingURL=creator-profile.service.js.map
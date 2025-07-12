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
exports.BrandProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const brand_profile_entity_1 = require("./entities/brand-profile.entity");
let BrandProfileService = class BrandProfileService {
    constructor(brandProfileRepository) {
        this.brandProfileRepository = brandProfileRepository;
    }
    async create(userId, createBrandProfileDto) {
        const profile = this.brandProfileRepository.create({
            ...createBrandProfileDto,
            user: { id: userId },
        });
        return await this.brandProfileRepository.save(profile);
    }
    async findAll() {
        return await this.brandProfileRepository.find({
            relations: ['user', 'campaigns'],
        });
    }
    async findOne(id) {
        const profile = await this.brandProfileRepository.findOne({
            where: { id },
            relations: ['user', 'campaigns'],
        });
        if (!profile) {
            throw new common_1.NotFoundException(`Brand profile with ID ${id} not found`);
        }
        return profile;
    }
    async findByUserId(userId) {
        return await this.brandProfileRepository.findOne({
            where: { user: { id: userId } },
            relations: ['user', 'campaigns'],
        });
    }
    async update(id, updateBrandProfileDto) {
        const profile = await this.findOne(id);
        Object.assign(profile, updateBrandProfileDto);
        return await this.brandProfileRepository.save(profile);
    }
    async remove(id) {
        const profile = await this.findOne(id);
        await this.brandProfileRepository.remove(profile);
    }
    async findVerifiedBrands() {
        return await this.brandProfileRepository.find({
            where: { verified: true },
            relations: ['user'],
        });
    }
    async findByIndustry(industry) {
        return await this.brandProfileRepository.find({
            where: { industry },
            relations: ['user'],
        });
    }
};
exports.BrandProfileService = BrandProfileService;
exports.BrandProfileService = BrandProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(brand_profile_entity_1.BrandProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BrandProfileService);
//# sourceMappingURL=brand-profile.service.js.map
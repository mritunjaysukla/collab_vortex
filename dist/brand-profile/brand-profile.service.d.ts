import { Repository } from 'typeorm';
import { BrandProfile } from './entities/brand-profile.entity';
import { CreateBrandProfileDto, UpdateBrandProfileDto } from './dto/brand-profile.dto';
export declare class BrandProfileService {
    private readonly brandProfileRepository;
    constructor(brandProfileRepository: Repository<BrandProfile>);
    create(userId: string, createBrandProfileDto: CreateBrandProfileDto): Promise<BrandProfile>;
    findAll(): Promise<BrandProfile[]>;
    findOne(id: string): Promise<BrandProfile>;
    findByUserId(userId: string): Promise<BrandProfile | null>;
    update(id: string, updateBrandProfileDto: UpdateBrandProfileDto): Promise<BrandProfile>;
    remove(id: string): Promise<void>;
    findVerifiedBrands(): Promise<BrandProfile[]>;
    findByIndustry(industry: string): Promise<BrandProfile[]>;
}

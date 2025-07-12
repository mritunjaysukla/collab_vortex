import { BrandProfileService } from './brand-profile.service';
import { CreateBrandProfileDto, UpdateBrandProfileDto } from './dto/brand-profile.dto';
export declare class BrandProfileController {
    private readonly brandProfileService;
    constructor(brandProfileService: BrandProfileService);
    create(req: any, createBrandProfileDto: CreateBrandProfileDto): Promise<import("./entities/brand-profile.entity").BrandProfile>;
    findAll(): Promise<import("./entities/brand-profile.entity").BrandProfile[]>;
    findVerified(): Promise<import("./entities/brand-profile.entity").BrandProfile[]>;
    findByIndustry(industry: string): Promise<import("./entities/brand-profile.entity").BrandProfile[]>;
    getMyProfile(req: any): Promise<import("./entities/brand-profile.entity").BrandProfile>;
    findOne(id: string): Promise<import("./entities/brand-profile.entity").BrandProfile>;
    update(id: string, updateBrandProfileDto: UpdateBrandProfileDto): Promise<import("./entities/brand-profile.entity").BrandProfile>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

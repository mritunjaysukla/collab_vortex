import { Repository } from 'typeorm';
import { Campaign } from './entities/campaign.entity';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { BrandProfileService } from '../brand-profile/brand-profile.service';
import { Platform } from '../common/enums';
export declare class CampaignService {
    private readonly campaignRepository;
    private readonly brandProfileService;
    constructor(campaignRepository: Repository<Campaign>, brandProfileService: BrandProfileService);
    create(userId: string, createCampaignDto: CreateCampaignDto): Promise<Campaign>;
    findAll(): Promise<Campaign[]>;
    findOne(id: string): Promise<Campaign>;
    findByBrandProfile(brandProfileId: string): Promise<Campaign[]>;
    findByUserId(userId: string): Promise<Campaign[]>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<Campaign>;
    remove(id: string): Promise<void>;
    findFeatured(): Promise<Campaign[]>;
    findByPlatform(platform: Platform): Promise<Campaign[]>;
    searchCampaigns(filters: {
        budget?: {
            min?: number;
            max?: number;
        };
        platforms?: Platform[];
        niches?: string[];
    }): Promise<Campaign[]>;
}

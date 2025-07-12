import { CampaignService } from './campaigns.service';
import { CreateCampaignDto, UpdateCampaignDto } from './dto/campaign.dto';
import { Platform } from '../common/enums';
export declare class CampaignController {
    private readonly campaignService;
    constructor(campaignService: CampaignService);
    create(req: any, createCampaignDto: CreateCampaignDto): Promise<import("./entities/campaign.entity").Campaign>;
    findAll(): Promise<import("./entities/campaign.entity").Campaign[]>;
    findFeatured(): Promise<import("./entities/campaign.entity").Campaign[]>;
    findMyCampaigns(req: any): Promise<import("./entities/campaign.entity").Campaign[]>;
    searchCampaigns(minBudget?: number, maxBudget?: number, platforms?: string, niches?: string): Promise<import("./entities/campaign.entity").Campaign[]>;
    findByPlatform(platform: Platform): Promise<import("./entities/campaign.entity").Campaign[]>;
    findOne(id: string): Promise<import("./entities/campaign.entity").Campaign>;
    update(id: string, updateCampaignDto: UpdateCampaignDto): Promise<import("./entities/campaign.entity").Campaign>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

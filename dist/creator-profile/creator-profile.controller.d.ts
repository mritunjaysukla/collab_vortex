import { CreatorProfileService } from './creator-profile.service';
import { CreateCreatorProfileDto, UpdateCreatorProfileDto } from './dto/creator-profile.dto';
export declare class CreatorProfileController {
    private readonly creatorProfileService;
    constructor(creatorProfileService: CreatorProfileService);
    create(req: any, createCreatorProfileDto: CreateCreatorProfileDto): Promise<import("./entities/creator-profile.entity").CreatorProfile>;
    findAll(): Promise<import("./entities/creator-profile.entity").CreatorProfile[]>;
    findVerified(): Promise<import("./entities/creator-profile.entity").CreatorProfile[]>;
    searchByNiches(niches: string[]): Promise<import("./entities/creator-profile.entity").CreatorProfile[]>;
    getMyProfile(req: any): Promise<import("./entities/creator-profile.entity").CreatorProfile>;
    findOne(id: string): Promise<import("./entities/creator-profile.entity").CreatorProfile>;
    update(id: string, updateCreatorProfileDto: UpdateCreatorProfileDto): Promise<import("./entities/creator-profile.entity").CreatorProfile>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

import { Repository } from 'typeorm';
import { CreatorProfile } from './entities/creator-profile.entity';
import { CreateCreatorProfileDto, UpdateCreatorProfileDto } from './dto/creator-profile.dto';
export declare class CreatorProfileService {
    private readonly creatorProfileRepository;
    constructor(creatorProfileRepository: Repository<CreatorProfile>);
    create(userId: string, createCreatorProfileDto: CreateCreatorProfileDto): Promise<CreatorProfile>;
    findAll(): Promise<CreatorProfile[]>;
    findOne(id: string): Promise<CreatorProfile>;
    findByUserId(userId: string): Promise<CreatorProfile | null>;
    update(id: string, updateCreatorProfileDto: UpdateCreatorProfileDto): Promise<CreatorProfile>;
    remove(id: string): Promise<void>;
    findVerifiedCreators(): Promise<CreatorProfile[]>;
    findByNiches(niches: string[]): Promise<CreatorProfile[]>;
}

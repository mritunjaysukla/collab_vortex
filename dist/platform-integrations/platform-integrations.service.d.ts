import { Repository } from 'typeorm';
import { PlatformIntegration } from './entities/platform-integration.entity';
import { CreatePlatformIntegrationDto, UpdatePlatformIntegrationDto } from './dto/platform-integration.dto';
import { Platform } from '../common/enums';
export declare class PlatformIntegrationService {
    private readonly platformIntegrationRepository;
    constructor(platformIntegrationRepository: Repository<PlatformIntegration>);
    create(creatorProfileId: string, createPlatformIntegrationDto: CreatePlatformIntegrationDto): Promise<PlatformIntegration>;
    findAll(): Promise<PlatformIntegration[]>;
    findByCreatorProfile(creatorProfileId: string): Promise<PlatformIntegration[]>;
    findByPlatform(platform: Platform): Promise<PlatformIntegration[]>;
    findOne(id: string): Promise<PlatformIntegration>;
    update(id: string, updatePlatformIntegrationDto: UpdatePlatformIntegrationDto): Promise<PlatformIntegration>;
    remove(id: string): Promise<void>;
    connect(id: string, authData: {
        authToken: string;
        refreshToken?: string;
        platformUserId: string;
        platformUsername: string;
    }): Promise<PlatformIntegration>;
    disconnect(id: string): Promise<PlatformIntegration>;
    syncPlatformData(id: string): Promise<PlatformIntegration>;
    private fetchPlatformData;
    getIntegrationStats(creatorProfileId: string): Promise<any>;
}

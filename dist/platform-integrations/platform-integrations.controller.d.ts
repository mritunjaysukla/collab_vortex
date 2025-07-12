import { PlatformIntegrationService } from './platform-integrations.service';
import { CreatePlatformIntegrationDto, UpdatePlatformIntegrationDto, ConnectPlatformDto } from './dto/platform-integration.dto';
import { Platform } from '../common/enums';
export declare class PlatformIntegrationController {
    private readonly platformIntegrationService;
    constructor(platformIntegrationService: PlatformIntegrationService);
    create(req: any, createPlatformIntegrationDto: CreatePlatformIntegrationDto): Promise<import("./entities/platform-integration.entity").PlatformIntegration>;
    findAll(): Promise<import("./entities/platform-integration.entity").PlatformIntegration[]>;
    findMyIntegrations(req: any): Promise<import("./entities/platform-integration.entity").PlatformIntegration[]>;
    findByPlatform(platform: Platform): Promise<import("./entities/platform-integration.entity").PlatformIntegration[]>;
    getStats(req: any): Promise<any>;
    findOne(id: string): Promise<import("./entities/platform-integration.entity").PlatformIntegration>;
    update(id: string, updatePlatformIntegrationDto: UpdatePlatformIntegrationDto): Promise<import("./entities/platform-integration.entity").PlatformIntegration>;
    connect(id: string, connectPlatformDto: ConnectPlatformDto): Promise<import("./entities/platform-integration.entity").PlatformIntegration>;
    disconnect(id: string): Promise<import("./entities/platform-integration.entity").PlatformIntegration>;
    sync(id: string): Promise<import("./entities/platform-integration.entity").PlatformIntegration>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

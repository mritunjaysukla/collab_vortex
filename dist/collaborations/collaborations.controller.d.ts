import { CollaborationService } from './collaborations.service';
import { CreateCollaborationDto, UpdateCollaborationDto } from './dto/collaboration.dto';
import { CollaborationStatus } from '../common/enums';
export declare class CollaborationController {
    private readonly collaborationService;
    constructor(collaborationService: CollaborationService);
    create(createCollaborationDto: CreateCollaborationDto): Promise<import("./entities/collaboration.entity").Collaboration>;
    findAll(): Promise<import("./entities/collaboration.entity").Collaboration[]>;
    findMyCollaborations(req: any): Promise<import("./entities/collaboration.entity").Collaboration[]>;
    findByStatus(status: CollaborationStatus): Promise<import("./entities/collaboration.entity").Collaboration[]>;
    findOne(id: string): Promise<import("./entities/collaboration.entity").Collaboration>;
    update(id: string, updateCollaborationDto: UpdateCollaborationDto): Promise<import("./entities/collaboration.entity").Collaboration>;
    completeCollaboration(id: string): Promise<import("./entities/collaboration.entity").Collaboration>;
    updateProgress(id: string, body: {
        progress: number;
    }): Promise<import("./entities/collaboration.entity").Collaboration>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

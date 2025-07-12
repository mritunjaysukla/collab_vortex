import { DeliverableService } from './deliverables.service';
import { CreateDeliverableDto, UpdateDeliverableDto, SubmitDeliverableDto, ReviewDeliverableDto, DeliverableStatus } from './dto/deliverable.dto';
export declare class DeliverableController {
    private readonly deliverableService;
    constructor(deliverableService: DeliverableService);
    create(createDeliverableDto: CreateDeliverableDto): Promise<import("./entities/deliverable.entity").Deliverable>;
    findAll(): Promise<import("./entities/deliverable.entity").Deliverable[]>;
    findByCollaboration(collaborationId: string): Promise<import("./entities/deliverable.entity").Deliverable[]>;
    findByStatus(status: DeliverableStatus): Promise<import("./entities/deliverable.entity").Deliverable[]>;
    findOverdue(): Promise<import("./entities/deliverable.entity").Deliverable[]>;
    getStats(collaborationId?: string): Promise<any>;
    findOne(id: string): Promise<import("./entities/deliverable.entity").Deliverable>;
    update(id: string, updateDeliverableDto: UpdateDeliverableDto): Promise<import("./entities/deliverable.entity").Deliverable>;
    submit(id: string, submitDeliverableDto: SubmitDeliverableDto): Promise<import("./entities/deliverable.entity").Deliverable>;
    review(id: string, reviewDeliverableDto: ReviewDeliverableDto): Promise<import("./entities/deliverable.entity").Deliverable>;
    resubmit(id: string, submitDeliverableDto: SubmitDeliverableDto): Promise<import("./entities/deliverable.entity").Deliverable>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

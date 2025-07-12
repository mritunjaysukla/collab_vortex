import { Repository } from 'typeorm';
import { Deliverable } from './entities/deliverable.entity';
import { CreateDeliverableDto, UpdateDeliverableDto, SubmitDeliverableDto, ReviewDeliverableDto, DeliverableStatus } from './dto/deliverable.dto';
export declare class DeliverableService {
    private readonly deliverableRepository;
    constructor(deliverableRepository: Repository<Deliverable>);
    create(createDeliverableDto: CreateDeliverableDto): Promise<Deliverable>;
    findAll(): Promise<Deliverable[]>;
    findByCollaboration(collaborationId: string): Promise<Deliverable[]>;
    findByStatus(status: DeliverableStatus): Promise<Deliverable[]>;
    findOverdue(): Promise<Deliverable[]>;
    findOne(id: string): Promise<Deliverable>;
    update(id: string, updateDeliverableDto: UpdateDeliverableDto): Promise<Deliverable>;
    submit(id: string, submitDeliverableDto: SubmitDeliverableDto): Promise<Deliverable>;
    review(id: string, reviewDeliverableDto: ReviewDeliverableDto): Promise<Deliverable>;
    resubmit(id: string, submitDeliverableDto: SubmitDeliverableDto): Promise<Deliverable>;
    remove(id: string): Promise<void>;
    getDeliverableStats(collaborationId?: string): Promise<any>;
}

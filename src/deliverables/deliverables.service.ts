import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deliverable } from './entities/deliverable.entity';
import {
  CreateDeliverableDto,
  UpdateDeliverableDto,
  SubmitDeliverableDto,
  ReviewDeliverableDto,
  DeliverableStatus
} from './dto/deliverable.dto';

@Injectable()
export class DeliverableService {
  constructor(
    @InjectRepository(Deliverable)
    private readonly deliverableRepository: Repository<Deliverable>,
  ) { }

  async create(createDeliverableDto: CreateDeliverableDto): Promise<Deliverable> {
    const { collaborationId, dueDate, ...deliverableData } = createDeliverableDto;

    const deliverable = new Deliverable();
    deliverable.title = deliverableData.title;
    deliverable.description = deliverableData.description;
    deliverable.metadata = deliverableData.metadata;
    deliverable.collaboration = { id: collaborationId } as any;

    if (dueDate) {
      deliverable.dueDate = new Date(dueDate);
    }

    return await this.deliverableRepository.save(deliverable);
  }

  async findAll(): Promise<Deliverable[]> {
    return await this.deliverableRepository.find({
      relations: ['collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCollaboration(collaborationId: string): Promise<Deliverable[]> {
    return await this.deliverableRepository.find({
      where: { collaboration: { id: collaborationId } },
      relations: ['collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByStatus(status: DeliverableStatus): Promise<Deliverable[]> {
    return await this.deliverableRepository.find({
      where: { status },
      relations: ['collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOverdue(): Promise<Deliverable[]> {
    const now = new Date();
    return await this.deliverableRepository
      .createQueryBuilder('deliverable')
      .leftJoinAndSelect('deliverable.collaboration', 'collaboration')
      .where('deliverable.dueDate < :now', { now })
      .andWhere('deliverable.status NOT IN (:...completedStatuses)', {
        completedStatuses: [DeliverableStatus.APPROVED, DeliverableStatus.REJECTED]
      })
      .orderBy('deliverable.dueDate', 'ASC')
      .getMany();
  }

  async findOne(id: string): Promise<Deliverable> {
    const deliverable = await this.deliverableRepository.findOne({
      where: { id },
      relations: ['collaboration'],
    });

    if (!deliverable) {
      throw new NotFoundException('Deliverable not found');
    }

    return deliverable;
  }

  async update(id: string, updateDeliverableDto: UpdateDeliverableDto): Promise<Deliverable> {
    const deliverable = await this.findOne(id);

    Object.assign(deliverable, updateDeliverableDto);

    if (updateDeliverableDto.dueDate) {
      deliverable.dueDate = new Date(updateDeliverableDto.dueDate);
    }

    return await this.deliverableRepository.save(deliverable);
  }

  async submit(id: string, submitDeliverableDto: SubmitDeliverableDto): Promise<Deliverable> {
    const deliverable = await this.findOne(id);

    if (deliverable.status !== DeliverableStatus.PENDING) {
      throw new BadRequestException('Deliverable must be in pending status to submit');
    }

    deliverable.contentUrl = submitDeliverableDto.content;
    deliverable.attachments = submitDeliverableDto.attachments || [];
    deliverable.metadata = { ...deliverable.metadata, ...submitDeliverableDto.metadata };
    deliverable.status = DeliverableStatus.SUBMITTED;
    deliverable.submittedAt = new Date();

    return await this.deliverableRepository.save(deliverable);
  }

  async review(id: string, reviewDeliverableDto: ReviewDeliverableDto): Promise<Deliverable> {
    const deliverable = await this.findOne(id);

    if (deliverable.status !== DeliverableStatus.SUBMITTED) {
      throw new BadRequestException('Deliverable must be submitted before it can be reviewed');
    }

    deliverable.status = reviewDeliverableDto.status;
    deliverable.feedback = reviewDeliverableDto.feedback;

    if (reviewDeliverableDto.status === DeliverableStatus.APPROVED) {
      deliverable.approvedAt = new Date();
    } else if (reviewDeliverableDto.status === DeliverableStatus.REVISION_REQUESTED) {
      deliverable.revisionCount += 1;
      deliverable.status = DeliverableStatus.PENDING; // Set back to pending for revision
    }

    return await this.deliverableRepository.save(deliverable);
  }

  async resubmit(id: string, submitDeliverableDto: SubmitDeliverableDto): Promise<Deliverable> {
    const deliverable = await this.findOne(id);

    if (deliverable.status !== DeliverableStatus.PENDING) {
      throw new BadRequestException('Deliverable must be in pending status to resubmit');
    }

    deliverable.contentUrl = submitDeliverableDto.content;
    deliverable.attachments = submitDeliverableDto.attachments || [];
    deliverable.metadata = { ...deliverable.metadata, ...submitDeliverableDto.metadata };
    deliverable.status = DeliverableStatus.SUBMITTED;
    deliverable.submittedAt = new Date();

    return await this.deliverableRepository.save(deliverable);
  }

  async remove(id: string): Promise<void> {
    const deliverable = await this.findOne(id);
    await this.deliverableRepository.remove(deliverable);
  }

  // Analytics methods
  async getDeliverableStats(collaborationId?: string): Promise<any> {
    const query = this.deliverableRepository.createQueryBuilder('deliverable');

    if (collaborationId) {
      query.where('deliverable.collaborationId = :collaborationId', { collaborationId });
    }

    const [total, pending, submitted, approved, rejected, revisionRequested] = await Promise.all([
      query.getCount(),
      query.clone().andWhere('deliverable.status = :status', { status: DeliverableStatus.PENDING }).getCount(),
      query.clone().andWhere('deliverable.status = :status', { status: DeliverableStatus.SUBMITTED }).getCount(),
      query.clone().andWhere('deliverable.status = :status', { status: DeliverableStatus.APPROVED }).getCount(),
      query.clone().andWhere('deliverable.status = :status', { status: DeliverableStatus.REJECTED }).getCount(),
      query.clone().andWhere('deliverable.status = :status', { status: DeliverableStatus.REVISION_REQUESTED }).getCount(),
    ]);

    return {
      total,
      pending,
      submitted,
      approved,
      rejected,
      revisionRequested,
      approvalRate: total > 0 ? (approved / total * 100).toFixed(2) : 0,
    };
  }
}

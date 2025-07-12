import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto, UpdateContractDto, ContractStatus } from './dto/contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
  ) { }

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const { collaborationId, ...contractData } = createContractDto;

    const contract = new Contract();
    contract.terms = contractData.terms;
    contract.milestones = contractData.milestones as any;
    contract.additionalTerms = contractData.additionalTerms;
    contract.collaboration = { id: collaborationId } as any;

    return await this.contractRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return await this.contractRepository.find({
      relations: ['collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCollaboration(collaborationId: string): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { collaboration: { id: collaborationId } },
      relations: ['collaboration'],
    });

    if (!contract) {
      throw new NotFoundException('Contract not found for this collaboration');
    }

    return contract;
  }

  async findByStatus(status: ContractStatus): Promise<Contract[]> {
    return await this.contractRepository.find({
      where: { status },
      relations: ['collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: ['collaboration'],
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return contract;
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = await this.findOne(id);

    Object.assign(contract, updateContractDto);

    // If both signatures are present, mark as signed
    if (contract.creatorSignature && contract.brandSignature && contract.status === ContractStatus.PENDING_SIGNATURE) {
      contract.status = ContractStatus.SIGNED;
      contract.signedAt = new Date();
    }

    return await this.contractRepository.save(contract);
  }

  async signContract(id: string, signature: string, userRole: 'creator' | 'brand'): Promise<Contract> {
    const contract = await this.findOne(id);

    if (userRole === 'creator') {
      contract.creatorSignature = signature;
    } else {
      contract.brandSignature = signature;
    }

    // If both signatures are present, mark as signed
    if (contract.creatorSignature && contract.brandSignature) {
      contract.status = ContractStatus.SIGNED;
      contract.signedAt = new Date();
    }

    return await this.contractRepository.save(contract);
  }

  async approve(id: string): Promise<Contract> {
    const contract = await this.findOne(id);
    contract.approved = true;
    contract.status = ContractStatus.ACTIVE;

    return await this.contractRepository.save(contract);
  }

  async complete(id: string): Promise<Contract> {
    const contract = await this.findOne(id);
    contract.status = ContractStatus.COMPLETED;

    return await this.contractRepository.save(contract);
  }

  async cancel(id: string): Promise<Contract> {
    const contract = await this.findOne(id);
    contract.status = ContractStatus.CANCELLED;

    return await this.contractRepository.save(contract);
  }

  async remove(id: string): Promise<void> {
    const contract = await this.findOne(id);
    await this.contractRepository.remove(contract);
  }
}

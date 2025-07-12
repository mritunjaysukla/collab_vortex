import { Repository } from 'typeorm';
import { Contract } from './entities/contract.entity';
import { CreateContractDto, UpdateContractDto, ContractStatus } from './dto/contract.dto';
export declare class ContractService {
    private readonly contractRepository;
    constructor(contractRepository: Repository<Contract>);
    create(createContractDto: CreateContractDto): Promise<Contract>;
    findAll(): Promise<Contract[]>;
    findByCollaboration(collaborationId: string): Promise<Contract>;
    findByStatus(status: ContractStatus): Promise<Contract[]>;
    findOne(id: string): Promise<Contract>;
    update(id: string, updateContractDto: UpdateContractDto): Promise<Contract>;
    signContract(id: string, signature: string, userRole: 'creator' | 'brand'): Promise<Contract>;
    approve(id: string): Promise<Contract>;
    complete(id: string): Promise<Contract>;
    cancel(id: string): Promise<Contract>;
    remove(id: string): Promise<void>;
}

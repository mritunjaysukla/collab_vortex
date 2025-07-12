import { ContractService } from './contracts.service';
import { CreateContractDto, UpdateContractDto, ContractStatus } from './dto/contract.dto';
export declare class ContractController {
    private readonly contractService;
    constructor(contractService: ContractService);
    create(createContractDto: CreateContractDto): Promise<import("./entities/contract.entity").Contract>;
    findAll(): Promise<import("./entities/contract.entity").Contract[]>;
    findByStatus(status: ContractStatus): Promise<import("./entities/contract.entity").Contract[]>;
    findByCollaboration(collaborationId: string): Promise<import("./entities/contract.entity").Contract>;
    findOne(id: string): Promise<import("./entities/contract.entity").Contract>;
    update(id: string, updateContractDto: UpdateContractDto): Promise<import("./entities/contract.entity").Contract>;
    signContract(id: string, signatureDto: {
        signature: string;
    }, req: any): Promise<import("./entities/contract.entity").Contract>;
    approve(id: string): Promise<import("./entities/contract.entity").Contract>;
    complete(id: string): Promise<import("./entities/contract.entity").Contract>;
    cancel(id: string): Promise<import("./entities/contract.entity").Contract>;
    remove(id: string): Promise<{
        message: string;
    }>;
}

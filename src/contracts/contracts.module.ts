import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { ContractService } from './contracts.service';
import { ContractController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule { }

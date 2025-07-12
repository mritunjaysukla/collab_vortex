import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deliverable } from './entities/deliverable.entity';
import { DeliverableService } from './deliverables.service';
import { DeliverableController } from './deliverables.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Deliverable])],
  controllers: [DeliverableController],
  providers: [DeliverableService],
  exports: [DeliverableService],
})
export class DeliverableModule { }

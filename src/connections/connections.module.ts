import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from './entities/connection.entity';
import { ConnectionsService } from './connections.service';
import { ConnectionsController } from './connections.controller';
import { CreatorProfileModule } from '../creator-profile/creator-profile.module';
import { BrandProfileModule } from '../brand-profile/brand-profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Connection]),
    CreatorProfileModule,
    BrandProfileModule,
  ],
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule { }

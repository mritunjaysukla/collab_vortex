import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformIntegration } from './entities/platform-integration.entity';
import { PlatformIntegrationService } from './platform-integrations.service';
import { PlatformIntegrationController } from './platform-integrations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PlatformIntegration])],
  controllers: [PlatformIntegrationController],
  providers: [PlatformIntegrationService],
  exports: [PlatformIntegrationService],
})
export class PlatformIntegrationModule { }

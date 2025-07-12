import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PlatformIntegrationService } from './platform-integrations.service';
import {
  CreatePlatformIntegrationDto,
  UpdatePlatformIntegrationDto,
  ConnectPlatformDto,
  PlatformIntegrationResponseDto,
  PlatformStatsDto
} from './dto/platform-integration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Platform } from '../common/enums';

@ApiTags('platform-integrations')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('platform-integrations')
export class PlatformIntegrationController {
  constructor(private readonly platformIntegrationService: PlatformIntegrationService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new platform integration' })
  @ApiResponse({ status: 201, description: 'Platform integration created successfully', type: PlatformIntegrationResponseDto })
  async create(@Request() req, @Body() createPlatformIntegrationDto: CreatePlatformIntegrationDto) {
    // Note: This assumes the user has a creator profile. In a real app, you'd need to handle this properly
    return await this.platformIntegrationService.create(req.user.creatorProfileId, createPlatformIntegrationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all platform integrations (admin only)' })
  @ApiResponse({ status: 200, description: 'Retrieved all platform integrations', type: [PlatformIntegrationResponseDto] })
  async findAll() {
    return await this.platformIntegrationService.findAll();
  }

  @Get('my-integrations')
  @ApiOperation({ summary: 'Get current user platform integrations' })
  @ApiResponse({ status: 200, description: 'Retrieved user platform integrations', type: [PlatformIntegrationResponseDto] })
  async findMyIntegrations(@Request() req) {
    return await this.platformIntegrationService.findByCreatorProfile(req.user.creatorProfileId);
  }

  @Get('platform/:platform')
  @ApiOperation({ summary: 'Get integrations by platform' })
  @ApiResponse({ status: 200, description: 'Retrieved platform integrations', type: [PlatformIntegrationResponseDto] })
  async findByPlatform(@Param('platform') platform: Platform) {
    return await this.platformIntegrationService.findByPlatform(platform);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get platform integration statistics' })
  @ApiResponse({ status: 200, description: 'Retrieved integration stats', type: PlatformStatsDto })
  async getStats(@Request() req) {
    return await this.platformIntegrationService.getIntegrationStats(req.user.creatorProfileId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific platform integration' })
  @ApiResponse({ status: 200, description: 'Retrieved platform integration', type: PlatformIntegrationResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.platformIntegrationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a platform integration' })
  @ApiResponse({ status: 200, description: 'Platform integration updated successfully', type: PlatformIntegrationResponseDto })
  async update(@Param('id') id: string, @Body() updatePlatformIntegrationDto: UpdatePlatformIntegrationDto) {
    return await this.platformIntegrationService.update(id, updatePlatformIntegrationDto);
  }

  @Post(':id/connect')
  @ApiOperation({ summary: 'Connect a platform integration with OAuth tokens' })
  @ApiResponse({ status: 200, description: 'Platform connected successfully', type: PlatformIntegrationResponseDto })
  async connect(@Param('id') id: string, @Body() connectPlatformDto: ConnectPlatformDto) {
    return await this.platformIntegrationService.connect(id, connectPlatformDto);
  }

  @Post(':id/disconnect')
  @ApiOperation({ summary: 'Disconnect a platform integration' })
  @ApiResponse({ status: 200, description: 'Platform disconnected successfully', type: PlatformIntegrationResponseDto })
  async disconnect(@Param('id') id: string) {
    return await this.platformIntegrationService.disconnect(id);
  }

  @Post(':id/sync')
  @ApiOperation({ summary: 'Sync platform data' })
  @ApiResponse({ status: 200, description: 'Platform data synced successfully', type: PlatformIntegrationResponseDto })
  async sync(@Param('id') id: string) {
    return await this.platformIntegrationService.syncPlatformData(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a platform integration' })
  @ApiResponse({ status: 200, description: 'Platform integration deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.platformIntegrationService.remove(id);
    return { message: 'Platform integration deleted successfully' };
  }
}

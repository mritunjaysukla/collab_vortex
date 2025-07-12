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
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CampaignService } from './campaigns.service';
import {
  CreateCampaignDto,
  UpdateCampaignDto,
  CampaignResponseDto,
} from './dto/campaign.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, Platform } from '../common/enums';

@ApiTags('campaigns')
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) { }

  @Post()
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new campaign' })
  @ApiResponse({
    status: 201,
    description: 'Campaign created successfully',
    type: CampaignResponseDto,
  })
  async create(
    @Request() req,
    @Body() createCampaignDto: CreateCampaignDto,
  ) {
    return await this.campaignService.create(req.user.id, createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active campaigns' })
  @ApiResponse({
    status: 200,
    description: 'List of active campaigns',
    type: [CampaignResponseDto],
  })
  async findAll() {
    return await this.campaignService.findAll();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured campaigns' })
  @ApiResponse({
    status: 200,
    description: 'List of featured campaigns',
    type: [CampaignResponseDto],
  })
  async findFeatured() {
    return await this.campaignService.findFeatured();
  }

  @Get('my-campaigns')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get current user campaigns' })
  @ApiResponse({
    status: 200,
    description: 'List of user campaigns',
    type: [CampaignResponseDto],
  })
  async findMyCampaigns(@Request() req) {
    return await this.campaignService.findByUserId(req.user.id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search campaigns with filters' })
  @ApiQuery({ name: 'minBudget', required: false, example: 1000 })
  @ApiQuery({ name: 'maxBudget', required: false, example: 10000 })
  @ApiQuery({ name: 'platforms', required: false, example: 'instagram,tiktok' })
  @ApiQuery({ name: 'niches', required: false, example: 'lifestyle,fashion' })
  @ApiResponse({
    status: 200,
    description: 'Filtered campaigns',
    type: [CampaignResponseDto],
  })
  async searchCampaigns(
    @Query('minBudget') minBudget?: number,
    @Query('maxBudget') maxBudget?: number,
    @Query('platforms') platforms?: string,
    @Query('niches') niches?: string,
  ) {
    const filters: any = {};

    if (minBudget || maxBudget) {
      filters.budget = {};
      if (minBudget) filters.budget.min = Number(minBudget);
      if (maxBudget) filters.budget.max = Number(maxBudget);
    }

    if (platforms) {
      filters.platforms = platforms.split(',') as Platform[];
    }

    if (niches) {
      filters.niches = niches.split(',');
    }

    return await this.campaignService.searchCampaigns(filters);
  }

  @Get('platform/:platform')
  @ApiOperation({ summary: 'Get campaigns by platform' })
  @ApiParam({ name: 'platform', enum: Platform })
  @ApiResponse({
    status: 200,
    description: 'Campaigns for the specified platform',
    type: [CampaignResponseDto],
  })
  async findByPlatform(@Param('platform') platform: Platform) {
    return await this.campaignService.findByPlatform(platform);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get campaign by ID' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign found',
    type: CampaignResponseDto,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.campaignService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Campaign updated successfully',
    type: CampaignResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return await this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete campaign' })
  @ApiParam({ name: 'id', description: 'Campaign ID' })
  @ApiResponse({ status: 200, description: 'Campaign deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.campaignService.remove(id);
    return { message: 'Campaign deleted successfully' };
  }
}

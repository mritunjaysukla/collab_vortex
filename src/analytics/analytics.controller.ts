import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) { }

  @Get('creator/:creatorProfileId')
  @ApiOperation({ summary: 'Get creator analytics' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiResponse({ status: 200, description: 'Retrieved creator analytics' })
  async getCreatorAnalytics(
    @Param('creatorProfileId') creatorProfileId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return await this.analyticsService.getCreatorAnalytics(creatorProfileId, start, end);
  }

  @Get('creator/:creatorProfileId/overview')
  @ApiOperation({ summary: 'Get creator performance overview' })
  @ApiResponse({ status: 200, description: 'Retrieved creator performance overview' })
  async getCreatorOverview(@Param('creatorProfileId') creatorProfileId: string) {
    return await this.analyticsService.getCreatorPerformanceOverview(creatorProfileId);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get campaign analytics' })
  @ApiQuery({ name: 'startDate', required: false, type: Date })
  @ApiQuery({ name: 'endDate', required: false, type: Date })
  @ApiResponse({ status: 200, description: 'Retrieved campaign analytics' })
  async getCampaignAnalytics(
    @Param('campaignId') campaignId: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const start = startDate ? new Date(startDate) : undefined;
    const end = endDate ? new Date(endDate) : undefined;
    return await this.analyticsService.getCampaignAnalytics(campaignId, start, end);
  }

  @Get('campaign/:campaignId/overview')
  @ApiOperation({ summary: 'Get campaign performance overview' })
  @ApiResponse({ status: 200, description: 'Retrieved campaign performance overview' })
  async getCampaignOverview(@Param('campaignId') campaignId: string) {
    return await this.analyticsService.getCampaignPerformanceOverview(campaignId);
  }
}

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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { ConnectionsService } from './connections.service';
import {
  CreateConnectionDto,
  UpdateConnectionDto,
  ConnectionResponseDto,
  ConnectionRecommendationDto,
  RecommendedCreatorCardDto,
  RecommendedBrandCardDto,
} from './dto/connection.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';

@ApiTags('connections')
@Controller('connections')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ConnectionsController {
  constructor(private readonly connectionsService: ConnectionsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new connection request' })
  @ApiResponse({
    status: 201,
    description: 'Connection request created successfully',
    type: ConnectionResponseDto,
  })
  async create(@Request() req, @Body() createConnectionDto: CreateConnectionDto) {
    return await this.connectionsService.create(
      req.user.id,
      req.user.role,
      createConnectionDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all connections for current user' })
  @ApiResponse({
    status: 200,
    description: 'List of all connections',
    type: [ConnectionResponseDto],
  })
  async findAll(@Request() req) {
    return await this.connectionsService.findAll(req.user.id, req.user.role);
  }

  @Get('pending')
  @ApiOperation({ summary: 'Get pending connection requests for current user' })
  @ApiResponse({
    status: 200,
    description: 'List of pending connection requests',
    type: [ConnectionResponseDto],
  })
  async findPending(@Request() req) {
    return await this.connectionsService.findPending(req.user.id, req.user.role);
  }

  @Get('recommendations')
  @ApiOperation({ summary: 'Get recommended connections based on niches/industry' })
  @ApiQuery({ name: 'niches', required: false, isArray: true, type: String })
  @ApiQuery({ name: 'industry', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of recommended profiles',
  })
  async getRecommendations(
    @Request() req,
    @Query('niches') niches?: string[],
    @Query('industry') industry?: string,
  ) {
    const filters: ConnectionRecommendationDto = {};

    if (niches) {
      filters.niches = Array.isArray(niches) ? niches : [niches];
    }

    if (industry) {
      filters.industry = industry;
    }

    return await this.connectionsService.getRecommendations(req.user.id, req.user.role, filters);
  }

  @Patch(':id/accept')
  @ApiOperation({ summary: 'Accept a connection request' })
  @ApiResponse({
    status: 200,
    description: 'Connection accepted',
    type: ConnectionResponseDto,
  })
  async accept(@Request() req, @Param('id') id: string) {
    return await this.connectionsService.update(
      id,
      req.user.id,
      req.user.role,
      { status: 'accepted' as any, message: 'Connection accepted' },
    );
  }

  @Patch(':id/reject')
  @ApiOperation({ summary: 'Reject a connection request' })
  @ApiResponse({
    status: 200,
    description: 'Connection rejected',
    type: ConnectionResponseDto,
  })
  async reject(@Request() req, @Param('id') id: string) {
    return await this.connectionsService.update(
      id,
      req.user.id,
      req.user.role,
      { status: 'rejected' as any, message: 'Connection rejected' },
    );
  }

  @Get('cards/creators')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get creator cards for brand discovery' })
  @ApiResponse({
    status: 200,
    description: 'List of recommended creator cards',
    type: [RecommendedCreatorCardDto],
  })
  async getCreatorCards(@Request() req): Promise<RecommendedCreatorCardDto[]> {
    return await this.connectionsService.getRecommendedCreatorsForBrand(req.user.id);
  }

  @Get('cards/brands')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get brand cards for creator discovery' })
  @ApiResponse({
    status: 200,
    description: 'List of recommended brand cards',
    type: [RecommendedBrandCardDto],
  })
  async getBrandCards(@Request() req): Promise<RecommendedBrandCardDto[]> {
    return await this.connectionsService.getRecommendedBrandsForCreator(req.user.id);
  }
}

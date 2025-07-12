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
import { CollaborationService } from './collaborations.service';
import {
  CreateCollaborationDto,
  UpdateCollaborationDto,
  CollaborationResponseDto,
} from './dto/collaboration.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, CollaborationStatus } from '../common/enums';

@ApiTags('collaborations')
@Controller('collaborations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class CollaborationController {
  constructor(private readonly collaborationService: CollaborationService) { }

  @Post()
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new collaboration' })
  @ApiResponse({
    status: 201,
    description: 'Collaboration created successfully',
    type: CollaborationResponseDto,
  })
  async create(@Body() createCollaborationDto: CreateCollaborationDto) {
    return await this.collaborationService.create(createCollaborationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all collaborations' })
  @ApiResponse({
    status: 200,
    description: 'List of collaborations',
    type: [CollaborationResponseDto],
  })
  async findAll() {
    return await this.collaborationService.findAll();
  }

  @Get('my-collaborations')
  @ApiOperation({ summary: 'Get current user collaborations' })
  @ApiResponse({
    status: 200,
    description: 'List of user collaborations',
    type: [CollaborationResponseDto],
  })
  async findMyCollaborations(@Request() req) {
    if (req.user.role === UserRole.CREATOR) {
      return await this.collaborationService.findByCreator(req.user.id);
    } else {
      return await this.collaborationService.findByBrand(req.user.id);
    }
  }

  @Get('by-status')
  @ApiOperation({ summary: 'Get collaborations by status' })
  @ApiQuery({ name: 'status', enum: CollaborationStatus })
  @ApiResponse({
    status: 200,
    description: 'Collaborations filtered by status',
    type: [CollaborationResponseDto],
  })
  async findByStatus(@Query('status') status: CollaborationStatus) {
    return await this.collaborationService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collaboration by ID' })
  @ApiParam({ name: 'id', description: 'Collaboration ID' })
  @ApiResponse({
    status: 200,
    description: 'Collaboration found',
    type: CollaborationResponseDto,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.collaborationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update collaboration' })
  @ApiParam({ name: 'id', description: 'Collaboration ID' })
  @ApiResponse({
    status: 200,
    description: 'Collaboration updated successfully',
    type: CollaborationResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCollaborationDto: UpdateCollaborationDto,
  ) {
    return await this.collaborationService.update(id, updateCollaborationDto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark collaboration as completed' })
  @ApiParam({ name: 'id', description: 'Collaboration ID' })
  @ApiResponse({
    status: 200,
    description: 'Collaboration completed successfully',
    type: CollaborationResponseDto,
  })
  async completeCollaboration(@Param('id', ParseUUIDPipe) id: string) {
    return await this.collaborationService.completeCollaboration(id);
  }

  @Patch(':id/progress')
  @ApiOperation({ summary: 'Update collaboration progress' })
  @ApiParam({ name: 'id', description: 'Collaboration ID' })
  @ApiResponse({
    status: 200,
    description: 'Progress updated successfully',
    type: CollaborationResponseDto,
  })
  async updateProgress(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { progress: number },
  ) {
    return await this.collaborationService.updateProgress(id, body.progress);
  }

  @Delete(':id')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete collaboration' })
  @ApiParam({ name: 'id', description: 'Collaboration ID' })
  @ApiResponse({ status: 200, description: 'Collaboration deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.collaborationService.remove(id);
    return { message: 'Collaboration deleted successfully' };
  }
}

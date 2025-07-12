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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DeliverableService } from './deliverables.service';
import {
  CreateDeliverableDto,
  UpdateDeliverableDto,
  SubmitDeliverableDto,
  ReviewDeliverableDto,
  DeliverableResponseDto,
  DeliverableStatus
} from './dto/deliverable.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';

@ApiTags('deliverables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('deliverables')
export class DeliverableController {
  constructor(private readonly deliverableService: DeliverableService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Create a new deliverable (Brand only)' })
  @ApiResponse({ status: 201, description: 'Deliverable created successfully', type: DeliverableResponseDto })
  async create(@Body() createDeliverableDto: CreateDeliverableDto) {
    return await this.deliverableService.create(createDeliverableDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all deliverables' })
  @ApiResponse({ status: 200, description: 'Retrieved all deliverables', type: [DeliverableResponseDto] })
  async findAll() {
    return await this.deliverableService.findAll();
  }

  @Get('collaboration/:collaborationId')
  @ApiOperation({ summary: 'Get deliverables by collaboration' })
  @ApiResponse({ status: 200, description: 'Retrieved deliverables for collaboration', type: [DeliverableResponseDto] })
  async findByCollaboration(@Param('collaborationId') collaborationId: string) {
    return await this.deliverableService.findByCollaboration(collaborationId);
  }

  @Get('by-status')
  @ApiOperation({ summary: 'Get deliverables by status' })
  @ApiQuery({ name: 'status', enum: DeliverableStatus, description: 'Deliverable status to filter by' })
  @ApiResponse({ status: 200, description: 'Retrieved deliverables by status', type: [DeliverableResponseDto] })
  async findByStatus(@Query('status') status: DeliverableStatus) {
    return await this.deliverableService.findByStatus(status);
  }

  @Get('overdue')
  @ApiOperation({ summary: 'Get overdue deliverables' })
  @ApiResponse({ status: 200, description: 'Retrieved overdue deliverables', type: [DeliverableResponseDto] })
  async findOverdue() {
    return await this.deliverableService.findOverdue();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get deliverable statistics' })
  @ApiQuery({ name: 'collaborationId', required: false, description: 'Filter stats by collaboration ID' })
  @ApiResponse({ status: 200, description: 'Retrieved deliverable statistics' })
  async getStats(@Query('collaborationId') collaborationId?: string) {
    return await this.deliverableService.getDeliverableStats(collaborationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific deliverable' })
  @ApiResponse({ status: 200, description: 'Retrieved deliverable', type: DeliverableResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.deliverableService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a deliverable' })
  @ApiResponse({ status: 200, description: 'Deliverable updated successfully', type: DeliverableResponseDto })
  async update(@Param('id') id: string, @Body() updateDeliverableDto: UpdateDeliverableDto) {
    return await this.deliverableService.update(id, updateDeliverableDto);
  }

  @Patch(':id/submit')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CREATOR)
  @ApiOperation({ summary: 'Submit a deliverable (Creator only)' })
  @ApiResponse({ status: 200, description: 'Deliverable submitted successfully', type: DeliverableResponseDto })
  async submit(@Param('id') id: string, @Body() submitDeliverableDto: SubmitDeliverableDto) {
    return await this.deliverableService.submit(id, submitDeliverableDto);
  }

  @Patch(':id/review')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Review a deliverable (Brand only)' })
  @ApiResponse({ status: 200, description: 'Deliverable reviewed successfully', type: DeliverableResponseDto })
  async review(@Param('id') id: string, @Body() reviewDeliverableDto: ReviewDeliverableDto) {
    return await this.deliverableService.review(id, reviewDeliverableDto);
  }

  @Patch(':id/resubmit')
  @UseGuards(RolesGuard)
  @Roles(UserRole.CREATOR)
  @ApiOperation({ summary: 'Resubmit a deliverable after revision (Creator only)' })
  @ApiResponse({ status: 200, description: 'Deliverable resubmitted successfully', type: DeliverableResponseDto })
  async resubmit(@Param('id') id: string, @Body() submitDeliverableDto: SubmitDeliverableDto) {
    return await this.deliverableService.resubmit(id, submitDeliverableDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Delete a deliverable (Brand only)' })
  @ApiResponse({ status: 200, description: 'Deliverable deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.deliverableService.remove(id);
    return { message: 'Deliverable deleted successfully' };
  }
}

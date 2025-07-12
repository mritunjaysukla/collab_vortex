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
import { ProposalService } from './proposals.service';
import {
  CreateProposalDto,
  UpdateProposalDto,
  ProposalResponseDto,
} from './dto/proposal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole, ProposalStatus } from '../common/enums';

@ApiTags('proposals')
@Controller('proposals')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class ProposalController {
  constructor(private readonly proposalService: ProposalService) { }

  @Post()
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new proposal' })
  @ApiResponse({
    status: 201,
    description: 'Proposal created successfully',
    type: ProposalResponseDto,
  })
  async create(
    @Request() req,
    @Body() createProposalDto: CreateProposalDto,
  ) {
    return await this.proposalService.create(req.user.id, createProposalDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all proposals' })
  @ApiResponse({
    status: 200,
    description: 'List of proposals',
    type: [ProposalResponseDto],
  })
  async findAll() {
    return await this.proposalService.findAll();
  }

  @Get('my-proposals')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get current creator proposals' })
  @ApiResponse({
    status: 200,
    description: 'List of creator proposals',
    type: [ProposalResponseDto],
  })
  async findMyProposals(@Request() req) {
    return await this.proposalService.findByCreator(req.user.id);
  }

  @Get('brand-proposals')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get proposals for brand campaigns' })
  @ApiResponse({
    status: 200,
    description: 'List of proposals for brand campaigns',
    type: [ProposalResponseDto],
  })
  async findBrandProposals(@Request() req) {
    return await this.proposalService.findByBrand(req.user.id);
  }

  @Get('by-status')
  @ApiOperation({ summary: 'Get proposals by status' })
  @ApiQuery({ name: 'status', enum: ProposalStatus })
  @ApiResponse({
    status: 200,
    description: 'Proposals filtered by status',
    type: [ProposalResponseDto],
  })
  async findByStatus(@Query('status') status: ProposalStatus) {
    return await this.proposalService.findByStatus(status);
  }

  @Get('campaign/:campaignId')
  @ApiOperation({ summary: 'Get proposals for a specific campaign' })
  @ApiParam({ name: 'campaignId', description: 'Campaign ID' })
  @ApiResponse({
    status: 200,
    description: 'Proposals for the campaign',
    type: [ProposalResponseDto],
  })
  async findByCampaign(@Param('campaignId', ParseUUIDPipe) campaignId: string) {
    return await this.proposalService.findByCampaign(campaignId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get proposal by ID' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({
    status: 200,
    description: 'Proposal found',
    type: ProposalResponseDto,
  })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.proposalService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({
    status: 200,
    description: 'Proposal updated successfully',
    type: ProposalResponseDto,
  })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProposalDto: UpdateProposalDto,
  ) {
    return await this.proposalService.update(id, updateProposalDto);
  }

  @Patch(':id/accept')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Accept proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({
    status: 200,
    description: 'Proposal accepted successfully',
    type: ProposalResponseDto,
  })
  async acceptProposal(@Param('id', ParseUUIDPipe) id: string) {
    return await this.proposalService.acceptProposal(id);
  }

  @Patch(':id/reject')
  @Roles(UserRole.BRAND)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Reject proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({
    status: 200,
    description: 'Proposal rejected successfully',
    type: ProposalResponseDto,
  })
  async rejectProposal(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: { rejectionReason?: string },
  ) {
    return await this.proposalService.rejectProposal(id, body.rejectionReason);
  }

  @Delete(':id')
  @Roles(UserRole.CREATOR)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete proposal' })
  @ApiParam({ name: 'id', description: 'Proposal ID' })
  @ApiResponse({ status: 200, description: 'Proposal deleted successfully' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.proposalService.remove(id);
    return { message: 'Proposal deleted successfully' };
  }
}

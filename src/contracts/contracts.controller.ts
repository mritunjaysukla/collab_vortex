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
import { ContractService } from './contracts.service';
import { CreateContractDto, UpdateContractDto, ContractResponseDto, ContractStatus } from './dto/contract.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums';

@ApiTags('contracts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) { }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Create a new contract (Brand only)' })
  @ApiResponse({ status: 201, description: 'Contract created successfully', type: ContractResponseDto })
  async create(@Body() createContractDto: CreateContractDto) {
    return await this.contractService.create(createContractDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Get all contracts (Brand only)' })
  @ApiResponse({ status: 200, description: 'Retrieved all contracts', type: [ContractResponseDto] })
  async findAll() {
    return await this.contractService.findAll();
  }

  @Get('by-status')
  @ApiOperation({ summary: 'Get contracts by status' })
  @ApiQuery({ name: 'status', enum: ContractStatus, description: 'Contract status to filter by' })
  @ApiResponse({ status: 200, description: 'Retrieved contracts by status', type: [ContractResponseDto] })
  async findByStatus(@Query('status') status: ContractStatus) {
    return await this.contractService.findByStatus(status);
  }

  @Get('collaboration/:collaborationId')
  @ApiOperation({ summary: 'Get contract by collaboration ID' })
  @ApiResponse({ status: 200, description: 'Retrieved contract for collaboration', type: ContractResponseDto })
  async findByCollaboration(@Param('collaborationId') collaborationId: string) {
    return await this.contractService.findByCollaboration(collaborationId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific contract' })
  @ApiResponse({ status: 200, description: 'Retrieved contract', type: ContractResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.contractService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contract' })
  @ApiResponse({ status: 200, description: 'Contract updated successfully', type: ContractResponseDto })
  async update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return await this.contractService.update(id, updateContractDto);
  }

  @Patch(':id/sign')
  @ApiOperation({ summary: 'Sign a contract' })
  @ApiResponse({ status: 200, description: 'Contract signed successfully', type: ContractResponseDto })
  async signContract(
    @Param('id') id: string,
    @Body() signatureDto: { signature: string },
    @Request() req,
  ) {
    const userRole = req.user.role as 'creator' | 'brand';
    return await this.contractService.signContract(id, signatureDto.signature, userRole);
  }

  @Patch(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Approve a contract (Brand only)' })
  @ApiResponse({ status: 200, description: 'Contract approved successfully', type: ContractResponseDto })
  async approve(@Param('id') id: string) {
    return await this.contractService.approve(id);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Mark contract as completed' })
  @ApiResponse({ status: 200, description: 'Contract marked as completed', type: ContractResponseDto })
  async complete(@Param('id') id: string) {
    return await this.contractService.complete(id);
  }

  @Patch(':id/cancel')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Cancel a contract (Brand only)' })
  @ApiResponse({ status: 200, description: 'Contract cancelled successfully', type: ContractResponseDto })
  async cancel(@Param('id') id: string) {
    return await this.contractService.cancel(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.BRAND)
  @ApiOperation({ summary: 'Delete a contract (Brand only)' })
  @ApiResponse({ status: 200, description: 'Contract deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.contractService.remove(id);
    return { message: 'Contract deleted successfully' };
  }
}

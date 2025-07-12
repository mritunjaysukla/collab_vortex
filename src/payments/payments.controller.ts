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
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from './payments.service';
import {
  CreatePaymentDto,
  UpdatePaymentDto,
  ProcessPaymentDto,
  PaymentResponseDto,
  PaymentStatsDto,
  MonthlyRevenueDto
} from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('payments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully', type: PaymentResponseDto })
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all payments (admin only)' })
  @ApiResponse({ status: 200, description: 'Retrieved all payments', type: [PaymentResponseDto] })
  async findAll() {
    return await this.paymentService.findAll();
  }

  @Get('my-payments')
  @ApiOperation({ summary: 'Get current user payments' })
  @ApiResponse({ status: 200, description: 'Retrieved user payments', type: [PaymentResponseDto] })
  async findMyPayments(@Request() req) {
    return await this.paymentService.findByUser(req.user.id);
  }

  @Get('outgoing')
  @ApiOperation({ summary: 'Get payments made by current user' })
  @ApiResponse({ status: 200, description: 'Retrieved outgoing payments', type: [PaymentResponseDto] })
  async findOutgoingPayments(@Request() req) {
    return await this.paymentService.findByPayer(req.user.id);
  }

  @Get('incoming')
  @ApiOperation({ summary: 'Get payments received by current user' })
  @ApiResponse({ status: 200, description: 'Retrieved incoming payments', type: [PaymentResponseDto] })
  async findIncomingPayments(@Request() req) {
    return await this.paymentService.findByPayee(req.user.id);
  }

  @Get('collaboration/:collaborationId')
  @ApiOperation({ summary: 'Get payments for a collaboration' })
  @ApiResponse({ status: 200, description: 'Retrieved collaboration payments', type: [PaymentResponseDto] })
  async findByCollaboration(@Param('collaborationId') collaborationId: string) {
    return await this.paymentService.findByCollaboration(collaborationId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get payment statistics' })
  @ApiResponse({ status: 200, description: 'Retrieved payment stats', type: PaymentStatsDto })
  async getStats(@Request() req, @Query('userId') userId?: string) {
    // Only allow users to see their own stats unless admin
    const targetUserId = userId && req.user.role === 'admin' ? userId : req.user.id;
    return await this.paymentService.getPaymentStats(targetUserId);
  }

  @Get('revenue/monthly')
  @ApiOperation({ summary: 'Get monthly revenue data' })
  @ApiResponse({ status: 200, description: 'Retrieved monthly revenue', type: [MonthlyRevenueDto] })
  async getMonthlyRevenue(@Request() req, @Query('userId') userId?: string) {
    // Only allow users to see their own revenue unless admin
    const targetUserId = userId && req.user.role === 'admin' ? userId : req.user.id;
    return await this.paymentService.getMonthlyRevenue(targetUserId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific payment' })
  @ApiResponse({ status: 200, description: 'Retrieved payment', type: PaymentResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.paymentService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a payment' })
  @ApiResponse({ status: 200, description: 'Payment updated successfully', type: PaymentResponseDto })
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentService.update(id, updatePaymentDto);
  }

  @Post(':id/process')
  @ApiOperation({ summary: 'Process a pending payment' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully', type: PaymentResponseDto })
  async processPayment(@Param('id') id: string, @Body() processPaymentDto: ProcessPaymentDto) {
    return await this.paymentService.processPayment(id, processPaymentDto);
  }

  @Post(':id/refund')
  @ApiOperation({ summary: 'Request a refund for a payment' })
  @ApiResponse({ status: 200, description: 'Refund processed successfully', type: PaymentResponseDto })
  async requestRefund(@Param('id') id: string, @Body() body: { reason: string }) {
    return await this.paymentService.requestRefund(id, body.reason);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a payment' })
  @ApiResponse({ status: 200, description: 'Payment deleted successfully' })
  async remove(@Param('id') id: string) {
    await this.paymentService.remove(id);
    return { message: 'Payment deleted successfully' };
  }
}

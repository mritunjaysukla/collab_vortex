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
import { MessageService } from './messages.service';
import { CreateMessageDto, MessageResponseDto } from './dto/message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('messages')
export class MessageController {
  
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @ApiOperation({ summary: 'Send a new message' })
  @ApiResponse({ status: 201, description: 'Message sent successfully', type: MessageResponseDto })
  async create(@Request() req, @Body() createMessageDto: CreateMessageDto) {
    return await this.messageService.create(req.user.id, createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all messages (admin only)' })
  @ApiResponse({ status: 200, description: 'Retrieved all messages', type: [MessageResponseDto] })
  async findAll() {
    return await this.messageService.findAll();
  }

  @Get('conversations')
  @ApiOperation({ summary: 'Get user conversations' })
  @ApiResponse({ status: 200, description: 'Retrieved user conversations' })
  async getUserConversations(@Request() req) {
    return await this.messageService.findUserConversations(req.user.id);
  }

  @Get('unread')
  @ApiOperation({ summary: 'Get unread messages' })
  @ApiResponse({ status: 200, description: 'Retrieved unread messages', type: [MessageResponseDto] })
  async getUnreadMessages(@Request() req) {
    return await this.messageService.findUnreadMessages(req.user.id);
  }

  @Get('conversation/:conversationId')
  @ApiOperation({ summary: 'Get messages in a conversation' })
  @ApiResponse({ status: 200, description: 'Retrieved conversation messages', type: [MessageResponseDto] })
  async getConversationMessages(
    @Param('conversationId') conversationId: string,
    @Request() req,
  ) {
    return await this.messageService.findByConversation(conversationId, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific message' })
  @ApiResponse({ status: 200, description: 'Retrieved message', type: MessageResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.messageService.findOne(id);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark message as read' })
  @ApiResponse({ status: 200, description: 'Message marked as read', type: MessageResponseDto })
  async markAsRead(@Param('id') id: string, @Request() req) {
    return await this.messageService.markAsRead(id, req.user.id);
  }

  @Patch('conversation/:conversationId/read')
  @ApiOperation({ summary: 'Mark all messages in conversation as read' })
  @ApiResponse({ status: 200, description: 'Conversation marked as read' })
  async markConversationAsRead(
    @Param('conversationId') conversationId: string,
    @Request() req,
  ) {
    await this.messageService.markConversationAsRead(conversationId, req.user.id);
    return { message: 'Conversation marked as read' };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message' })
  @ApiResponse({ status: 200, description: 'Message deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.messageService.remove(id, req.user.id);
    return { message: 'Message deleted successfully' };
  }
}

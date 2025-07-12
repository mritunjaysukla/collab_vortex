import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsBoolean } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'uuid-recipient-id' })
  @IsUUID()
  recipientId: string;

  @ApiProperty({ example: 'Hello! I would like to discuss the campaign details.' })
  @IsString()
  text: string;

  @ApiProperty({ example: 'https://example.com/attachment.pdf', required: false })
  @IsOptional()
  @IsString()
  attachmentUrl?: string;

  @ApiProperty({ example: 'conv-uuid-123', required: false })
  @IsOptional()
  @IsString()
  conversationId?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isSystemMessage?: boolean;
}

export class UpdateMessageDto extends PartialType(CreateMessageDto) { }

export class MessageResponseDto {
  @ApiProperty({ example: 'uuid-message-id' })
  id: string;

  @ApiProperty({ example: 'uuid-sender-id' })
  senderId: string;

  @ApiProperty({ example: 'uuid-recipient-id' })
  recipientId: string;

  @ApiProperty({ example: 'Hello! I would like to discuss the campaign details.' })
  text: string;

  @ApiProperty({ example: 'https://example.com/attachment.pdf' })
  attachmentUrl?: string;

  @ApiProperty()
  readAt?: Date;

  @ApiProperty({ example: false })
  isSystemMessage: boolean;

  @ApiProperty({ example: 'conv-uuid-123' })
  conversationId: string;

  @ApiProperty()
  timestamp: Date;
}

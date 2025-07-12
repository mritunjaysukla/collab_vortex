import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID, IsEnum, IsObject } from 'class-validator';
import { NotificationType } from '../../common/enums';

export class CreateNotificationDto {
  @ApiProperty({ example: 'uuid-user-id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'You have a new proposal for your campaign' })
  @IsString()
  message: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.PROPOSAL_RECEIVED })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty({
    example: { campaignId: 'uuid-campaign-id', proposalId: 'uuid-proposal-id' },
    required: false
  })
  @IsOptional()
  @IsObject()
  metadata?: {
    campaignId?: string;
    proposalId?: string;
    collaborationId?: string;
    messageId?: string;
    [key: string]: any;
  };

  @ApiProperty({ example: '/campaigns/uuid-campaign-id', required: false })
  @IsOptional()
  @IsString()
  actionUrl?: string;
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) { }

export class NotificationResponseDto {
  @ApiProperty({ example: 'uuid-notification-id' })
  id: string;

  @ApiProperty({ example: 'uuid-user-id' })
  userId: string;

  @ApiProperty({ example: 'You have a new proposal for your campaign' })
  message: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.PROPOSAL_RECEIVED })
  type: NotificationType;

  @ApiProperty({ example: false })
  read: boolean;

  @ApiProperty({ example: { campaignId: 'uuid-campaign-id' } })
  metadata?: object;

  @ApiProperty({ example: '/campaigns/uuid-campaign-id' })
  actionUrl?: string;

  @ApiProperty()
  createdAt: Date;
}

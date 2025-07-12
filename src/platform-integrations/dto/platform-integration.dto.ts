import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { Platform } from '../../common/enums';

export class CreatePlatformIntegrationDto {
  @ApiProperty({ enum: Platform, example: Platform.INSTAGRAM })
  @IsEnum(Platform)
  platform: Platform;

  @ApiProperty({ example: 'Optional initial platform username', required: false })
  @IsString()
  @IsOptional()
  platformUsername?: string;
}

export class UpdatePlatformIntegrationDto extends PartialType(CreatePlatformIntegrationDto) {
  @ApiProperty({ example: 'connected', required: false })
  @IsString()
  @IsOptional()
  syncStatus?: string;

  @ApiProperty({ example: 'platform_user_123', required: false })
  @IsString()
  @IsOptional()
  platformUserId?: string;

  @ApiProperty({ example: 'creator_username', required: false })
  @IsString()
  @IsOptional()
  platformUsername?: string;

  @ApiProperty({
    example: { followerCount: 10000, engagementRate: 5.2 },
    required: false
  })
  @IsObject()
  @IsOptional()
  platformData?: any;

  @ApiProperty({ example: 'Connection error message', required: false })
  @IsString()
  @IsOptional()
  errorMessage?: string;
}

export class ConnectPlatformDto {
  @ApiProperty({ example: 'oauth_access_token_here' })
  @IsString()
  authToken: string;

  @ApiProperty({ example: 'oauth_refresh_token_here', required: false })
  @IsString()
  @IsOptional()
  refreshToken?: string;

  @ApiProperty({ example: 'platform_user_123' })
  @IsString()
  platformUserId: string;

  @ApiProperty({ example: 'creator_username' })
  @IsString()
  platformUsername: string;
}

export class PlatformIntegrationResponseDto {
  @ApiProperty({ example: 'uuid-integration-id' })
  id: string;

  @ApiProperty({ enum: Platform, example: Platform.INSTAGRAM })
  platform: Platform;

  @ApiProperty({ example: 'connected' })
  syncStatus: string;

  @ApiProperty({ example: '2024-07-12T10:00:00Z', nullable: true })
  lastSyncAt: Date | null;

  @ApiProperty({ example: 'creator_username', nullable: true })
  platformUsername: string | null;

  @ApiProperty({ example: 'platform_user_123', nullable: true })
  platformUserId: string | null;

  @ApiProperty({
    example: {
      followerCount: 10000,
      engagementRate: 5.2,
      profileUrl: 'https://instagram.com/creator_username'
    },
    nullable: true
  })
  platformData: any | null;

  @ApiProperty({ example: null, nullable: true })
  errorMessage: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PlatformStatsDto {
  @ApiProperty({ example: 3 })
  totalIntegrations: number;

  @ApiProperty({ example: 2 })
  connectedIntegrations: number;

  @ApiProperty({ example: 1 })
  disconnectedIntegrations: number;

  @ApiProperty({ example: 0 })
  errorIntegrations: number;

  @ApiProperty({ example: ['instagram', 'tiktok'] })
  platforms: Platform[];

  @ApiProperty({ example: 25000 })
  totalFollowers: number;

  @ApiProperty({ example: 4.8 })
  averageEngagement: number;
}

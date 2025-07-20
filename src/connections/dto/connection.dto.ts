import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { ConnectionInitiator, ConnectionStatus } from '../entities/connection.entity';

export class CreateConnectionDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  targetProfileId: string;

  @ApiProperty({ example: 'I love your content and think we could collaborate!' })
  @IsOptional()
  @IsString()
  message?: string;
}

export class UpdateConnectionDto {
  @ApiProperty({ enum: ConnectionStatus, example: ConnectionStatus.ACCEPTED })
  @IsEnum(ConnectionStatus)
  status: ConnectionStatus;

  @ApiProperty({ example: 'Thank you for connecting!' })
  @IsOptional()
  @IsString()
  message?: string;
}

export class ConnectionResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  creatorProfile: any;

  @ApiProperty()
  brandProfile: any;

  @ApiProperty({ enum: ConnectionStatus })
  status: ConnectionStatus;

  @ApiProperty({ enum: ConnectionInitiator })
  initiator: ConnectionInitiator;

  @ApiProperty()
  message: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ConnectionRecommendationDto {
  @ApiProperty({ example: ['fashion', 'lifestyle'] })
  @IsOptional()
  @IsString({ each: true })
  niches?: string[];

  @ApiProperty({ example: 'Fashion & Lifestyle' })
  @IsOptional()
  @IsString()
  industry?: string;
}

export class RecommendedCreatorCardDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg' })
  avatar: string;

  @ApiProperty({ example: ['lifestyle', 'fashion', 'travel'] })
  niches: string[];

  @ApiProperty({ example: 15 })
  activeCount: number;

  @ApiProperty({ example: 3 })
  pastCount: number;
}

export class RecommendedBrandCardDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'Fashion Forward Inc.' })
  name: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  avatar: string;

  @ApiProperty({ example: 'Fashion & Lifestyle' })
  industry: string;

  @ApiProperty({ example: 8 })
  activeCount: number;

  @ApiProperty({ example: 2 })
  pastCount: number;
}
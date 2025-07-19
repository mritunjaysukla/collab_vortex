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
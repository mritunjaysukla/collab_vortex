import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsString,
  IsNumber,
  IsUUID,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CollaborationStatus } from '../../common/enums';

export class CreateCollaborationDto {
  @ApiProperty({ example: 'uuid-campaign-id' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ example: 'uuid-proposal-id' })
  @IsUUID()
  proposalId: string;

  @ApiProperty({ example: '2024-07-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-07-30' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 'Initial collaboration notes' })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateCollaborationDto {
  @ApiProperty({ example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2024-08-15' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ enum: CollaborationStatus })
  @IsOptional()
  @IsEnum(CollaborationStatus)
  status?: CollaborationStatus;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({ example: 'Updated collaboration notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: 0.75, description: 'Progress from 0.0 to 1.0' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  progress?: number;
}

export class CollaborationResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: '2024-07-15' })
  startDate: Date;

  @ApiProperty({ example: '2024-07-30' })
  endDate: Date;

  @ApiProperty({ enum: CollaborationStatus })
  status: CollaborationStatus;

  @ApiProperty({ example: false })
  isCompleted: boolean;

  @ApiProperty({ example: 'Collaboration notes' })
  notes: string;

  @ApiProperty({ example: 0.50 })
  progress: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

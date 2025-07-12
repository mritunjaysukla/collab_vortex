import {
  IsString,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUrl,
  IsArray,
  IsDateString,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProposalStatus } from '../../common/enums';

export class CreateProposalDto {
  @ApiProperty({ example: 'uuid-campaign-id' })
  @IsUUID()
  campaignId: string;

  @ApiProperty({ example: 'I would love to work on this campaign...' })
  @IsOptional()
  @IsString()
  customMessage?: string;

  @ApiProperty({ example: 1500.00 })
  @IsNumber()
  @IsPositive()
  rate: number;

  @ApiProperty({ example: 'https://myportfolio.com' })
  @IsOptional()
  @IsUrl()
  portfolioLink?: string;

  @ApiProperty({ example: ['Instagram post with swipe-up', 'TikTok dance video'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deliverableProposals?: string[];

  @ApiProperty({ example: '2024-07-15' })
  @IsOptional()
  @IsDateString()
  proposedStartDate?: string;

  @ApiProperty({ example: '2024-07-30' })
  @IsOptional()
  @IsDateString()
  proposedEndDate?: string;
}

export class UpdateProposalDto {
  @ApiProperty({ example: 'Updated proposal message' })
  @IsOptional()
  @IsString()
  customMessage?: string;

  @ApiProperty({ example: 1750.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  rate?: number;

  @ApiProperty({ enum: ProposalStatus })
  @IsOptional()
  @IsEnum(ProposalStatus)
  status?: ProposalStatus;

  @ApiProperty({ example: 'https://updated-portfolio.com' })
  @IsOptional()
  @IsUrl()
  portfolioLink?: string;

  @ApiProperty({ example: ['Updated deliverable proposal'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deliverableProposals?: string[];

  @ApiProperty({ example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  proposedStartDate?: string;

  @ApiProperty({ example: '2024-08-15' })
  @IsOptional()
  @IsDateString()
  proposedEndDate?: string;

  @ApiProperty({ example: 'Budget constraints' })
  @IsOptional()
  @IsString()
  rejectionReason?: string;
}

export class ProposalResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'I would love to work on this campaign...' })
  customMessage: string;

  @ApiProperty({ example: 1500.00 })
  rate: number;

  @ApiProperty({ enum: ProposalStatus })
  status: ProposalStatus;

  @ApiProperty({ example: 'https://myportfolio.com' })
  portfolioLink: string;

  @ApiProperty({ example: ['Instagram post with swipe-up', 'TikTok dance video'] })
  deliverableProposals: string[];

  @ApiProperty({ example: '2024-07-15' })
  proposedStartDate: Date;

  @ApiProperty({ example: '2024-07-30' })
  proposedEndDate: Date;

  @ApiProperty({ example: 'Budget constraints' })
  rejectionReason: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

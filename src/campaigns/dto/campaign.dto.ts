import {
  IsString,
  IsNumber,
  IsArray,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsPositive,
  ValidateNested,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Platform } from '../../common/enums';

class CampaignRequirementsDto {
  @ApiProperty({ example: 1000 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minFollowers?: number;

  @ApiProperty({ example: 3.5 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  minEngagementRate?: number;

  @ApiProperty({ example: '18-35' })
  @IsOptional()
  @IsString()
  ageRange?: string;

  @ApiProperty({ example: ['New York', 'Los Angeles'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  location?: string[];

  @ApiProperty({ example: ['lifestyle', 'fashion'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  niches?: string[];
}

export class CreateCampaignDto {
  @ApiProperty({ example: 'Summer Fashion Collection 2024' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Promote our new summer collection with authentic lifestyle content' })
  @IsString()
  description: string;

  @ApiProperty({ example: 5000.00 })
  @IsNumber()
  @IsPositive()
  budget: number;

  @ApiProperty({ example: ['young adults', 'fashion enthusiasts'] })
  @IsArray()
  @IsString({ each: true })
  targetAudience: string[];

  @ApiProperty({ example: '2024-07-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2024-07-31' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ enum: Platform, isArray: true, example: [Platform.INSTAGRAM, Platform.TIKTOK] })
  @IsArray()
  @IsEnum(Platform, { each: true })
  platforms: Platform[];

  @ApiProperty({ example: ['2 Instagram posts', '1 TikTok video', '3 stories'] })
  @IsArray()
  @IsString({ each: true })
  deliverables: string[];

  @ApiProperty({ type: CampaignRequirementsDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CampaignRequirementsDto)
  requirements?: CampaignRequirementsDto;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class UpdateCampaignDto {
  @ApiProperty({ example: 'Updated Campaign Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated campaign description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 7500.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  budget?: number;

  @ApiProperty({ example: ['millennials', 'gen-z'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];

  @ApiProperty({ example: '2024-08-01' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({ example: '2024-08-31' })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ enum: Platform, isArray: true })
  @IsOptional()
  @IsArray()
  @IsEnum(Platform, { each: true })
  platforms?: Platform[];

  @ApiProperty({ example: ['3 Instagram posts', '2 TikTok videos'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  deliverables?: string[];

  @ApiProperty({ type: CampaignRequirementsDto })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => CampaignRequirementsDto)
  requirements?: CampaignRequirementsDto;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}

export class CampaignResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'Summer Fashion Collection 2024' })
  title: string;

  @ApiProperty({ example: 'Promote our new summer collection with authentic lifestyle content' })
  description: string;

  @ApiProperty({ example: 5000.00 })
  budget: number;

  @ApiProperty({ example: ['young adults', 'fashion enthusiasts'] })
  targetAudience: string[];

  @ApiProperty({ example: '2024-07-01' })
  startDate: Date;

  @ApiProperty({ example: '2024-07-31' })
  endDate: Date;

  @ApiProperty({ enum: Platform, isArray: true })
  platforms: Platform[];

  @ApiProperty({ example: ['2 Instagram posts', '1 TikTok video', '3 stories'] })
  deliverables: string[];

  @ApiProperty({ type: CampaignRequirementsDto })
  requirements: CampaignRequirementsDto;

  @ApiProperty({ example: true })
  isActive: boolean;

  @ApiProperty({ example: false })
  isFeatured: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

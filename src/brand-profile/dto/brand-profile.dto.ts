import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandProfileDto {
  @ApiProperty({ example: 'Fashion Forward Inc.' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'Fashion & Lifestyle' })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({ example: '50-100 employees' })
  @IsOptional()
  @IsString()
  teamSize?: string;

  @ApiProperty({ example: 'Leading fashion brand focusing on sustainable clothing' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://fashionforward.com' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'New York, NY' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: ['young adults', 'fashion enthusiasts', 'eco-conscious'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];

  @ApiProperty({ example: 50000.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  monthlyBudget?: number;
}

export class UpdateBrandProfileDto {
  @ApiProperty({ example: 'Updated Fashion Forward Inc.' })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ example: 'Fashion & Technology' })
  @IsOptional()
  @IsString()
  industry?: string;

  @ApiProperty({ example: 'https://example.com/new-logo.png' })
  @IsOptional()
  @IsUrl()
  logoUrl?: string;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({ example: '100-200 employees' })
  @IsOptional()
  @IsString()
  teamSize?: string;

  @ApiProperty({ example: 'Updated brand description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'https://newfashionforward.com' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'Los Angeles, CA' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: ['millennials', 'gen-z', 'sustainability advocates'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];

  @ApiProperty({ example: 75000.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  monthlyBudget?: number;
}

export class BrandProfileResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'Fashion Forward Inc.' })
  companyName: string;

  @ApiProperty({ example: 'Fashion & Lifestyle' })
  industry: string;

  @ApiProperty({ example: 'https://example.com/logo.png' })
  logoUrl: string;

  @ApiProperty({ example: true })
  verified: boolean;

  @ApiProperty({ example: '50-100 employees' })
  teamSize: string;

  @ApiProperty({ example: 'Leading fashion brand focusing on sustainable clothing' })
  description: string;

  @ApiProperty({ example: 'https://fashionforward.com' })
  website: string;

  @ApiProperty({ example: 'New York, NY' })
  location: string;

  @ApiProperty({ example: ['young adults', 'fashion enthusiasts', 'eco-conscious'] })
  targetAudience: string[];

  @ApiProperty({ example: 50000.00 })
  monthlyBudget: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

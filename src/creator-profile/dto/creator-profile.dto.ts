import {
  IsString,
  IsOptional,
  IsBoolean,
  IsArray,
  IsNumber,
  IsUrl,
  ValidateNested,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PlatformStatsDto {
  @ApiProperty({ example: 'instagram' })
  @IsString()
  platform: string;

  @ApiProperty({ example: 10000 })
  @IsNumber()
  @IsPositive()
  followers: number;

  @ApiProperty({ example: 5.2 })
  @IsNumber()
  @IsPositive()
  engagementRate: number;

  @ApiProperty({ example: 1500 })
  @IsNumber()
  @IsPositive()
  avgViews: number;
}

export class CreateCreatorProfileDto {
  @ApiProperty({ example: 'Passionate content creator focused on lifestyle and fashion' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  @IsOptional()
  @IsUrl()
  profileImage?: string;

  @ApiProperty({
    type: [PlatformStatsDto],
    example: [
      {
        platform: 'instagram',
        followers: 10000,
        engagementRate: 5.2,
        avgViews: 1500,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatformStatsDto)
  platformStats?: PlatformStatsDto[];

  @ApiProperty({ example: ['lifestyle', 'fashion', 'travel'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  niches?: string[];

  @ApiProperty({ example: 'New York, NY' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'https://mywebsite.com' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'https://example.com/mediakit.pdf' })
  @IsOptional()
  @IsUrl()
  mediaKit?: string;

  @ApiProperty({ example: 500.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  baseRate?: number;
}

export class UpdateCreatorProfileDto {
  @ApiProperty({ example: 'Updated bio content' })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'https://example.com/new-profile.jpg' })
  @IsOptional()
  @IsUrl()
  profileImage?: string;

  @ApiProperty({
    type: [PlatformStatsDto],
    example: [
      {
        platform: 'instagram',
        followers: 12000,
        engagementRate: 5.8,
        avgViews: 1800,
      },
    ],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatformStatsDto)
  platformStats?: PlatformStatsDto[];

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({ example: ['lifestyle', 'fitness', 'health'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  niches?: string[];

  @ApiProperty({ example: 'Los Angeles, CA' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ example: 'https://newwebsite.com' })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ example: 'https://example.com/new-mediakit.pdf' })
  @IsOptional()
  @IsUrl()
  mediaKit?: string;

  @ApiProperty({ example: 750.00 })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  baseRate?: number;
}

export class CreatorProfileResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'Passionate content creator focused on lifestyle and fashion' })
  bio: string;

  @ApiProperty({ example: 'https://example.com/profile.jpg' })
  profileImage: string;

  @ApiProperty({
    type: [PlatformStatsDto],
    example: [
      {
        platform: 'instagram',
        followers: 10000,
        engagementRate: 5.2,
        avgViews: 1500,
      },
    ],
  })
  platformStats: PlatformStatsDto[];

  @ApiProperty({ example: true })
  isVerified: boolean;

  @ApiProperty({ example: ['lifestyle', 'fashion', 'travel'] })
  niches: string[];

  @ApiProperty({ example: 'New York, NY' })
  location: string;

  @ApiProperty({ example: 'https://mywebsite.com' })
  website: string;

  @ApiProperty({ example: 'https://example.com/mediakit.pdf' })
  mediaKit: string;

  @ApiProperty({ example: 500.00 })
  baseRate: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

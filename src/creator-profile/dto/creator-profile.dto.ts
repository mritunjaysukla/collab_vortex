import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUrl,
  IsPositive,
} from 'class-validator';
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
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Passionate content creator focused on lifestyle and fashion' })
  @IsOptional()
  @IsString()
  bio?: string;

  // No validation here because we'll handle it separately with file upload
  @ApiProperty({ type: 'string', format: 'binary', description: 'Profile image file (jpeg, jpg, png)' })
  profileImage?: any;

  // Added properties for file metadata
  profileImageFilename?: string;
  profileImageMimetype?: string;

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
  platformStats?: PlatformStatsDto[] | any;

  @ApiProperty({ example: ['lifestyle', 'fashion', 'travel'] })
  @IsOptional()
  niches?: string[] | any;

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
  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Updated bio content' })
  @IsOptional()
  @IsString()
  bio?: string;

  // No validation here because we'll handle it separately with file upload
  @ApiProperty({ type: 'string', format: 'binary', description: 'Profile image file (jpeg, jpg, png)' })
  profileImage?: any;

  // Added properties for file metadata
  profileImageFilename?: string;
  profileImageOriginalname?: string;
  profileImageMimetype?: string;

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
  platformStats?: PlatformStatsDto[] | any;

  @ApiProperty({ example: false })
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @ApiProperty({ example: ['lifestyle', 'fitness', 'health'] })
  @IsOptional()
  niches?: string[] | any;

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

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'Passionate content creator focused on lifestyle and fashion' })
  bio: string;

  @ApiProperty({ example: 'profile.jpg' })
  profileImageFilename: string;

  @ApiProperty({ example: 'my_profile.jpg' })
  profileImageOriginalname: string;

  @ApiProperty({ example: 'image/jpeg' })
  profileImageMimetype: string;

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

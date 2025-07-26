import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUrl,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Min,
  Max,
  IsPositive,
  ArrayMaxSize,
  IsEnum,
  IsObject,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

// Enums
export enum SocialPlatform {
  INSTAGRAM = 'instagram',
  TIKTOK = 'tiktok',
  YOUTUBE = 'youtube',
  TWITTER = 'twitter',
  LINKEDIN = 'linkedin',
  FACEBOOK = 'facebook',
}

export enum CreatorNiche {
  LIFESTYLE = 'lifestyle',
  FASHION = 'fashion',
  BEAUTY = 'beauty',
  FITNESS = 'fitness',
  FOOD = 'food',
  TRAVEL = 'travel',
  TECH = 'tech',
  GAMING = 'gaming',
  MUSIC = 'music',
  ART = 'art',
  EDUCATION = 'education',
  BUSINESS = 'business',
  HEALTH = 'health',
  PARENTING = 'parenting',
  PETS = 'pets',
  SPORTS = 'sports',
  ENTERTAINMENT = 'entertainment',
}

// Platform Stats DTO with looser validation
export class PlatformStatDto {
  @ApiProperty({
    description: 'Social media platform name',
    enum: SocialPlatform,
    example: 'instagram',
  })
  @IsString()
  @IsNotEmpty()
  platform: SocialPlatform | string;

  @ApiProperty({
    description: 'Number of followers on this platform',
    example: 50000,
    minimum: 0,
  })
  @Transform(({ value }) => typeof value === 'string' ? parseInt(value) : value)
  @IsNumber()
  @Min(0)
  followers: number;

  @ApiProperty({
    description: 'Engagement rate as percentage (0-100)',
    example: 5.2,
    minimum: 0,
    maximum: 100,
  })
  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value) : value)
  @IsNumber()
  @Min(0)
  @Max(100)
  engagementRate: number;

  @ApiPropertyOptional({
    description: 'Average views per post',
    example: 15000,
    minimum: 0,
  })
  @IsOptional()
  @Transform(({ value }) => typeof value === 'string' ? parseInt(value) : value)
  @IsNumber()
  @Min(0)
  avgViews?: number;
}

// Social Links DTO with better validation
export class SocialLinksDto {
  @ApiPropertyOptional({ example: 'https://instagram.com/username' })
  @IsOptional()
  @IsString()
  instagram?: string;

  @ApiPropertyOptional({ example: 'https://tiktok.com/@username' })
  @IsOptional()
  @IsString()
  tiktok?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/c/username' })
  @IsOptional()
  @IsString()
  youtube?: string;

  @ApiPropertyOptional({ example: 'https://twitter.com/username' })
  @IsOptional()
  @IsString()
  twitter?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/username' })
  @IsOptional()
  @IsString()
  linkedin?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/username' })
  @IsOptional()
  @IsString()
  facebook?: string;
}

// Create Creator Profile DTO with better form data handling
export class CreateCreatorProfileDto {
  @ApiProperty({
    description: 'Creator full name',
    example: 'Sarah Johnson',
    minLength: 2,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Creator bio and description',
    example: 'Passionate lifestyle and fashion content creator with 3+ years of experience.',
    maxLength: 1000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  bio?: string;

  @ApiPropertyOptional({
    description: 'Platform statistics. Send as JSON string: [{"platform":"instagram","followers":50000,"engagementRate":5.2,"avgViews":15000}]',
    example: '[{"platform":"instagram","followers":50000,"engagementRate":5.2,"avgViews":15000}]',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlatformStatDto)
  @ArrayMaxSize(10)
  platformStats?: PlatformStatDto[];

  @ApiPropertyOptional({
    description: 'Content niches. Send as JSON string: ["lifestyle","fashion","beauty"] or comma-separated: "lifestyle,fashion,beauty"',
    example: '["lifestyle","fashion","beauty"]',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : value.split(',').map(item => item.trim());
      } catch {
        return value.split(',').map(item => item.trim());
      }
    }
    return Array.isArray(value) ? value : [];
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  niches?: string[];

  @ApiPropertyOptional({
    description: 'Creator location/city',
    example: 'New York, NY',
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  location?: string;

  @ApiPropertyOptional({
    description: 'Personal website URL',
    example: 'https://sarahjohnson.com',
  })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiPropertyOptional({
    description: 'Media kit download URL',
    example: 'https://drive.google.com/file/d/mediakit.pdf',
  })
  @IsOptional()
  @IsString()
  mediaKit?: string;

  @ApiPropertyOptional({
    description: 'Base rate for collaborations in USD',
    example: 750.00,
    minimum: 0,
  })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? parseFloat(value) : value))
  @IsNumber()
  @Min(0)
  baseRate?: number;

  @ApiPropertyOptional({
    description: 'Portfolio website URL',
    example: 'https://portfolio.sarahjohnson.com',
  })
  @IsOptional()
  @IsString()
  portfolioUrl?: string;

  @ApiPropertyOptional({
    description: 'Social media links. Send as JSON string: {"instagram":"https://instagram.com/username","tiktok":"https://tiktok.com/@username"}',
    example: '{"instagram":"https://instagram.com/username","tiktok":"https://tiktok.com/@username"}',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return {};
      }
    }
    return value || {};
  })
  @IsObject()
  socialLinks?: any;

  @ApiPropertyOptional({
    description: 'Availability for new collaborations',
    example: true,
    default: true,
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }
    return Boolean(value);
  })
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({
    description: 'Profile image file upload',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  profileImage?: any;

  // Auto-set properties
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean;

  @IsOptional()
  @IsString()
  profileImageFilename?: string;

  @IsOptional()
  @IsString()
  profileImageMimetype?: string;

  @IsOptional()
  @IsNumber()
  profileImageSize?: number;
}

// Update Creator Profile DTO
export class UpdateCreatorProfileDto extends PartialType(CreateCreatorProfileDto) { }

// Creator Profile Response DTO
export class CreatorProfileResponseDto {
  @ApiProperty({ example: 'uuid-string' })
  id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'Passionate content creator' })
  bio: string;

  @ApiProperty({ example: 'profile.jpg' })
  profileImageFilename: string;

  @ApiProperty({ example: 'image/jpeg' })
  profileImageMimetype: string;

  @ApiProperty({ example: 1024000 })
  profileImageSize: number;

  // NEW: Direct URL fields
  @ApiProperty({
    example: 'http://localhost:3001/media/creator-profiles/abc123.jpg',
    description: 'Direct URL to profile image'
  })
  profileImageUrl: string;

  @ApiProperty({
    example: 'http://localhost:3001/cdn/creator-profiles/abc123.jpg',
    description: 'CDN URL for profile image'
  })
  profileImageCdnUrl: string;

  @ApiProperty({
    description: 'Profile image URLs in different sizes',
    example: {
      original: 'http://localhost:3001/media/creator-profiles/abc123.jpg',
      thumbnail: 'http://localhost:3001/media/creator-profiles/abc123.jpg?size=thumbnail',
      medium: 'http://localhost:3001/media/creator-profiles/abc123.jpg?size=medium',
      large: 'http://localhost:3001/media/creator-profiles/abc123.jpg?size=large'
    }
  })
  profileImageUrls: {
    original: string;
    thumbnail: string;
    medium: string;
    large: string;
  };

  @ApiProperty({ type: [PlatformStatDto] })
  platformStats: PlatformStatDto[];

  @ApiProperty({ example: true })
  isVerified: boolean;

  @ApiProperty({ example: ['lifestyle', 'fashion'] })
  niches: string[];

  @ApiProperty({ example: 'New York, NY' })
  location: string;

  @ApiProperty({ example: 'https://mywebsite.com' })
  website: string;

  @ApiProperty({ example: 'https://example.com/mediakit.pdf' })
  mediaKit: string;

  @ApiProperty({ example: 'https://portfolio.com' })
  portfolioUrl: string;

  @ApiProperty({ example: 500.00 })
  baseRate: number;

  @ApiProperty({ type: SocialLinksDto })
  socialLinks: SocialLinksDto;

  @ApiProperty({ example: true })
  isAvailable: boolean;

  @ApiProperty({ example: 4.5 })
  averageRating: number;

  @ApiProperty({ example: 25 })
  totalCollaborations: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  user: {
    id: string;
    email: string;
    role: string;
  };
}

// Query DTO for filtering
export class CreatorProfileQueryDto {
  @ApiPropertyOptional({ description: 'Filter by niche' })
  @IsOptional()
  @IsString()
  niche?: string;

  @ApiPropertyOptional({ description: 'Filter by location' })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({ description: 'Filter by verification status' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isVerified?: boolean;

  @ApiPropertyOptional({ description: 'Filter by availability' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ description: 'Minimum followers count' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  minFollowers?: number;

  @ApiPropertyOptional({ description: 'Maximum followers count' })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
  maxFollowers?: number;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Sort field',
    enum: ['createdAt', 'name', 'averageRating', 'totalFollowers'],
  })
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @ApiPropertyOptional({
    description: 'Sort order',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsString()
  sortOrder?: 'ASC' | 'DESC' = 'DESC';

  @ApiPropertyOptional({ description: 'Search term' })
  @IsOptional()
  @IsString()
  search?: string;
}

// Stats DTO
export class CreatorProfileStatsDto {
  @ApiProperty({ example: 25 })
  totalCollaborations: number;

  @ApiProperty({ example: 15 })
  totalReviews: number;

  @ApiProperty({ example: 4.5 })
  averageRating: number;

  @ApiProperty({ example: 50000 })
  totalFollowers: number;

  @ApiProperty({ example: 5.2 })
  averageEngagementRate: number;

  @ApiProperty({ example: 20 })
  completedProjects: number;

  @ApiProperty({ example: '2024-01-15T10:30:00Z' })
  lastActiveAt: Date;
}

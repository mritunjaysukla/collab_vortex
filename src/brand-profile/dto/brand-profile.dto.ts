import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsUrl,
  IsPositive,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';

export class CreateBrandProfileDto {
  @ApiProperty({ example: 'Fashion Forward Inc.' })
  @IsString()
  companyName: string;

  @ApiProperty({ example: 'Fashion & Lifestyle' })
  @IsOptional()
  @IsString()
  industry?: string;

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

  @ApiProperty({
    example: ['young adults', 'fashion enthusiasts', 'eco-conscious'],
    description: 'Target audience array (can be JSON string in form data)',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      try {
        // First try to parse as JSON
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        // If JSON parsing fails, split by comma
        return value.split(',').map(item => item.trim());
      }
    }
    return Array.isArray(value) ? value : [value];
  })
  @IsArray()
  @IsString({ each: true })
  targetAudience?: string[];

  @ApiProperty({ example: 50000.0 })
  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? parseFloat(value) : value))
  @IsNumber()
  monthlyBudget?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Brand logo image file (jpeg, jpg, png)',
  })
  @IsOptional()
  logo?: any;

  // File metadata properties (set by controller)
  @IsOptional()
  @IsString()
  logoFilename?: string;

  @IsOptional()
  @IsString()
  logoMimetype?: string;
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

  // No validation here because we'll handle it separately with file upload
  @ApiProperty({ type: 'string', format: 'binary', description: 'Brand logo image file (jpeg, jpg, png)' })
  logo?: any;

  // Added properties for file metadata
  logoFilename?: string;
  logoMimetype?: string;

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
  targetAudience?: string[] | any;

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

  @ApiProperty({ example: 'logo.jpg' })
  logoFilename: string;

  @ApiProperty({ example: 'image/jpeg' })
  logoMimetype: string;

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

  // NEW: Direct URL fields
  @ApiProperty({
    example: 'http://localhost:3001/media/brand-profiles/abc123.jpg',
    description: 'Direct URL to brand logo'
  })
  logoUrl: string;

  @ApiProperty({
    example: 'http://localhost:3001/cdn/brand-profiles/abc123.jpg',
    description: 'CDN URL for brand logo'
  })
  logoCdnUrl: string;

  @ApiProperty({
    description: 'Brand logo URLs in different sizes',
    example: {
      original: 'http://localhost:3001/media/brand-profiles/abc123.jpg',
      thumbnail: 'http://localhost:3001/media/brand-profiles/abc123.jpg?size=thumbnail',
      medium: 'http://localhost:3001/media/brand-profiles/abc123.jpg?size=medium',
      large: 'http://localhost:3001/media/brand-profiles/abc123.jpg?size=large'
    }
  })
  logoUrls: {
    original: string;
    thumbnail: string;
    medium: string;
    large: string;
  };

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

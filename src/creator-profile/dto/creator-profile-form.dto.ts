import { ApiProperty } from '@nestjs/swagger';

export class CreateCreatorProfileFormDto {
  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'Passionate content creator focused on lifestyle and fashion' })
  bio?: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Profile image file (jpeg, jpg, png)' })
  profileImage?: any;

  @ApiProperty({
    example: '[{"platform":"instagram","followers":10000,"engagementRate":5.2,"avgViews":1500}]',
    description: 'JSON string array of platform statistics'
  })
  platformStats?: string;

  @ApiProperty({
    example: '["lifestyle","fashion","travel"]',
    description: 'JSON string array of niches'
  })
  niches?: string;

  @ApiProperty({ example: 'New York, NY' })
  location?: string;

  @ApiProperty({ example: 'https://mywebsite.com' })
  website?: string;

  @ApiProperty({ example: 'https://example.com/mediakit.pdf' })
  mediaKit?: string;

  @ApiProperty({ example: '500.00' })
  baseRate?: string;
}

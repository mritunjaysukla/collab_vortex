import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandProfileFormDto {
  @ApiProperty({ example: 'Fashion Forward Inc.' })
  companyName: string;

  @ApiProperty({ example: 'Fashion & Lifestyle' })
  industry?: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Brand logo image file (jpeg, jpg, png)' })
  logo?: any;

  @ApiProperty({ example: '50-100 employees' })
  teamSize?: string;

  @ApiProperty({ example: 'Leading fashion brand focusing on sustainable clothing' })
  description?: string;

  @ApiProperty({ example: 'https://fashionforward.com' })
  website?: string;

  @ApiProperty({ example: 'New York, NY' })
  location?: string;

  @ApiProperty({
    example: '["young adults","fashion enthusiasts","eco-conscious"]',
    description: 'JSON string array of target audience'
  })
  targetAudience?: string;

  @ApiProperty({ example: '50000.00' })
  monthlyBudget?: string;
}

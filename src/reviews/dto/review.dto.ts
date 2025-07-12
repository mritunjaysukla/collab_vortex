import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsUUID, IsInt, Min, Max, IsOptional, IsEnum } from 'class-validator';
import { ReviewVisibility } from '../../common/enums';

export class CreateReviewDto {
  @ApiProperty({ example: 'uuid-reviewee-id' })
  @IsUUID()
  revieweeId: string;

  @ApiProperty({ example: 'uuid-collaboration-id' })
  @IsUUID()
  collaborationId: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 'Great collaboration! Professional and delivered high-quality content on time.' })
  @IsString()
  comment: string;

  @ApiProperty({ enum: ReviewVisibility, example: ReviewVisibility.PUBLIC })
  @IsEnum(ReviewVisibility)
  @IsOptional()
  visibility?: ReviewVisibility = ReviewVisibility.PUBLIC;
}

export class UpdateReviewDto extends PartialType(CreateReviewDto) {
  @ApiProperty({ example: 4, minimum: 1, maximum: 5, required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 'Updated review comment', required: false })
  @IsString()
  @IsOptional()
  comment?: string;

  @ApiProperty({ enum: ReviewVisibility, required: false })
  @IsEnum(ReviewVisibility)
  @IsOptional()
  visibility?: ReviewVisibility;
}

export class ReviewResponseDto {
  @ApiProperty({ example: 'uuid-review-id' })
  id: string;

  @ApiProperty({ example: 'uuid-collaboration-id' })
  collaborationId: string;

  @ApiProperty({ example: { id: 'uuid-reviewer-id', email: 'reviewer@example.com' } })
  reviewer: {
    id: string;
    email: string;
  };

  @ApiProperty({ example: { id: 'uuid-reviewee-id', email: 'reviewee@example.com' } })
  reviewee: {
    id: string;
    email: string;
  };

  @ApiProperty({ example: 5 })
  rating: number;

  @ApiProperty({ example: 'Excellent collaboration!' })
  comment: string;

  @ApiProperty({ enum: ReviewVisibility, example: ReviewVisibility.PUBLIC })
  visibility: ReviewVisibility;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class ReviewStatsDto {
  @ApiProperty({ example: 4.5 })
  averageRating: number;

  @ApiProperty({ example: 25 })
  totalReviews: number;

  @ApiProperty({ example: 20 })
  positiveReviews: number;

  @ApiProperty({ example: 2 })
  negativeReviews: number;

  @ApiProperty({
    example: [
      { rating: 5, count: 15 },
      { rating: 4, count: 8 },
      { rating: 3, count: 1 },
      { rating: 2, count: 1 },
      { rating: 1, count: 0 }
    ]
  })
  ratingDistribution: { rating: number; count: number }[];
}

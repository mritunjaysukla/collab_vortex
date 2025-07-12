import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReviewService } from './reviews.service';
import { CreateReviewDto, UpdateReviewDto, ReviewResponseDto, ReviewStatsDto } from './dto/review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('reviews')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new review' })
  @ApiResponse({ status: 201, description: 'Review created successfully', type: ReviewResponseDto })
  async create(@Request() req, @Body() createReviewDto: CreateReviewDto) {
    return await this.reviewService.create(req.user.id, createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reviews (admin only)' })
  @ApiResponse({ status: 200, description: 'Retrieved all reviews', type: [ReviewResponseDto] })
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get reviews for a specific user' })
  @ApiResponse({ status: 200, description: 'Retrieved user reviews', type: [ReviewResponseDto] })
  async findByUser(@Param('userId') userId: string) {
    return await this.reviewService.findByReviewee(userId);
  }

  @Get('my-reviews')
  @ApiOperation({ summary: 'Get reviews written by current user' })
  @ApiResponse({ status: 200, description: 'Retrieved my reviews', type: [ReviewResponseDto] })
  async findMyReviews(@Request() req) {
    return await this.reviewService.findByReviewer(req.user.id);
  }

  @Get('collaboration/:collaborationId')
  @ApiOperation({ summary: 'Get reviews for a collaboration' })
  @ApiResponse({ status: 200, description: 'Retrieved collaboration reviews', type: [ReviewResponseDto] })
  async findByCollaboration(@Param('collaborationId') collaborationId: string) {
    return await this.reviewService.findByCollaboration(collaborationId);
  }

  @Get('stats/:userId')
  @ApiOperation({ summary: 'Get review statistics for a user' })
  @ApiResponse({ status: 200, description: 'Retrieved review stats', type: ReviewStatsDto })
  async getStats(@Param('userId') userId: string) {
    return await this.reviewService.getReviewStats(userId);
  }

  @Get('recent/:userId')
  @ApiOperation({ summary: 'Get recent reviews for a user' })
  @ApiResponse({ status: 200, description: 'Retrieved recent reviews', type: [ReviewResponseDto] })
  async getRecentReviews(
    @Param('userId') userId: string,
    @Query('limit') limit?: number,
  ) {
    return await this.reviewService.getRecentReviews(userId, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific review' })
  @ApiResponse({ status: 200, description: 'Retrieved review', type: ReviewResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.reviewService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review' })
  @ApiResponse({ status: 200, description: 'Review updated successfully', type: ReviewResponseDto })
  async update(@Param('id') id: string, @Request() req, @Body() updateReviewDto: UpdateReviewDto) {
    return await this.reviewService.update(id, req.user.id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully' })
  async remove(@Param('id') id: string, @Request() req) {
    await this.reviewService.remove(id, req.user.id);
    return { message: 'Review deleted successfully' };
  }
}

import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto, UpdateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) { }

  async create(reviewerUserId: string, createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewRepository.create({
      ...createReviewDto,
      reviewer: { id: reviewerUserId } as any,
      reviewee: { id: createReviewDto.revieweeId } as any,
      collaboration: { id: createReviewDto.collaborationId } as any,
    });

    return await this.reviewRepository.save(review);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewRepository.find({
      relations: ['reviewer', 'reviewee', 'collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByReviewee(revieweeId: string): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { reviewee: { id: revieweeId } },
      relations: ['reviewer', 'collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByReviewer(reviewerId: string): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { reviewer: { id: reviewerId } },
      relations: ['reviewee', 'collaboration'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByCollaboration(collaborationId: string): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { collaboration: { id: collaborationId } },
      relations: ['reviewer', 'reviewee'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
      relations: ['reviewer', 'reviewee', 'collaboration'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: string, userId: string, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);

    if (review.reviewer.id !== userId) {
      throw new ForbiddenException('You can only update your own reviews');
    }

    Object.assign(review, updateReviewDto);
    return await this.reviewRepository.save(review);
  }

  async remove(id: string, userId: string): Promise<void> {
    const review = await this.findOne(id);

    if (review.reviewer.id !== userId) {
      throw new ForbiddenException('You can only delete your own reviews');
    }

    await this.reviewRepository.remove(review);
  }

  // Analytics methods
  async getReviewStats(userId: string): Promise<any> {
    const stats = await this.reviewRepository
      .createQueryBuilder('review')
      .select([
        'AVG(review.rating) as averageRating',
        'COUNT(review.id) as totalReviews',
        'COUNT(CASE WHEN review.rating >= 4 THEN 1 END) as positiveReviews',
        'COUNT(CASE WHEN review.rating <= 2 THEN 1 END) as negativeReviews',
      ])
      .where('review.revieweeId = :userId', { userId })
      .getRawOne();

    const ratingDistribution = await this.reviewRepository
      .createQueryBuilder('review')
      .select('review.rating as rating, COUNT(review.id) as count')
      .where('review.revieweeId = :userId', { userId })
      .groupBy('review.rating')
      .orderBy('review.rating', 'DESC')
      .getRawMany();

    return {
      averageRating: parseFloat(stats.averageRating) || 0,
      totalReviews: parseInt(stats.totalReviews) || 0,
      positiveReviews: parseInt(stats.positiveReviews) || 0,
      negativeReviews: parseInt(stats.negativeReviews) || 0,
      ratingDistribution: ratingDistribution.map(item => ({
        rating: item.rating,
        count: parseInt(item.count),
      })),
    };
  }

  async getRecentReviews(userId: string, limit = 10): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: { reviewee: { id: userId } },
      relations: ['reviewer', 'collaboration'],
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }
}

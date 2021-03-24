import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from '../models/reviews/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService],
})
export class ReviewsModule {}

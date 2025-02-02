import { ICommandHandlerAdapter } from '@/utils/command';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReviewCreateCommand } from '../../core/review/command/review-create';
import { ReviewEntity } from '../../core/review/entity/review';
import { ReviewCreateHandler } from '../../core/review/handler/review-create';
import { IReviewRepository } from '../../core/review/repository/review';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';
import { ReviewRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewSchema])],
  controllers: [],
  providers: [
    {
      provide: IReviewRepository,
      useFactory: (repository: Repository<ReviewSchema & ReviewEntity>) => {
        return new ReviewRepository(repository);
      },
      inject: [getRepositoryToken(ReviewSchema)]
    },
    {
      provide: ICommandHandlerAdapter<ReviewCreateCommand>,
      useFactory(repository: IReviewRepository) {
        return new ReviewCreateHandler(repository)
      },
      inject: [IReviewRepository]
    }
  ],
  exports: [IReviewRepository, ICommandHandlerAdapter<ReviewCreateCommand>]
})
export class ReviewModule {}

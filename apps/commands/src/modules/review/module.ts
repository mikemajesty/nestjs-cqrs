import { ICommandHandler } from '@/utils/command';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductRepository } from '../../core/product/repository/product';
import { ReviewCreateCommand } from '../../core/review/command/review-create';
import { ReviewCreateHandler } from '../../core/review/handler/review-create';
import { IReviewRepository } from '../../core/review/repository/review';
import { ProductSchema } from '../../infra/database/postgres/schemas/product';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';
import { ProductRepositoryProviver } from '../product/providers';
import { ReviewRepositoryProviver } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewSchema, ProductSchema])],
  controllers: [],
  providers: [
    ReviewRepositoryProviver,
    ProductRepositoryProviver,
    {
      provide: ICommandHandler<ReviewCreateCommand>,
      useFactory(repository: IReviewRepository, productRepository: IProductRepository) {
        return new ReviewCreateHandler(repository, productRepository)
      },
      inject: [IReviewRepository, IProductRepository]
    }
  ],
  exports: [IReviewRepository, ICommandHandler<ReviewCreateCommand>]
})
export class ReviewModule {}

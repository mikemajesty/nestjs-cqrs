import { ICommandHandler } from '@/utils/command';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IProductRepository } from '../../core/product/repository/product';
import { ReviewCreateCommand } from '../../core/review/command/review-create';
import { ReviewCreateHandler } from '../../core/review/handler/review-create';
import { IReviewRepository } from '../../core/review/repository/review';
import { ProductSchema } from '../../infra/database/postgres/schemas/product';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';
import { IProducerAdapter } from '../../infra/producer/adapter';
import { ProducerModule } from '../../infra/producer/module';
import { ProductRepositoryProviver } from '../product/providers';
import { ReviewController } from './controller';
import { ReviewRepositoryProviver } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([ReviewSchema, ProductSchema]), ProducerModule],
  controllers: [ReviewController],
  providers: [
    ReviewRepositoryProviver,
    ProductRepositoryProviver,
    {
      provide: ICommandHandler<ReviewCreateCommand>,
      useFactory(repository: IReviewRepository, productRepository: IProductRepository, producer: IProducerAdapter) {
        return new ReviewCreateHandler(repository, productRepository, producer)
      },
      inject: [IReviewRepository, IProductRepository, IProducerAdapter]
    }
  ],
  exports: [IReviewRepository, ICommandHandler<ReviewCreateCommand>]
})
export class ReviewModule {}

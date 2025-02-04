import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import mongoose, { Connection, PaginateModel, Schema } from 'mongoose';

import { IProductRepository } from '../../core/product/repository/product';
import { ProductCreateUsecase } from '../../core/product/use-cases/product-create';
import { ProductDeleteUsecase } from '../../core/product/use-cases/product-delete';
import { ProductUpdateUsecase } from '../../core/product/use-cases/product-update';
import { ReviewCreateUsecase } from '../../core/review/use-cases/review-create';
import { ConnectionName } from '../../infra/database/enum';
import { Product, ProductDocument, ProductSchema } from '../../infra/database/mongo/schemas/product';
import { IProductCreateAdapter, IProductDeleteAdapter, IProductUpdateAdapter, IReviewUpdateAdapter } from './adapter';
import { ProductRepository } from './repository';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: IProductRepository,
      useFactory: async (connection: Connection) => {
        type Model = mongoose.PaginateModel<ProductDocument>;

        const repository: PaginateModel<ProductDocument> = connection.model<ProductDocument, Model>(
          Product.name,
          ProductSchema as Schema
        );

        return new ProductRepository(repository);
      },
      inject: [getConnectionToken(ConnectionName.QUERIES)]
    },
    {
      provide: IProductCreateAdapter,
      useFactory(repository: IProductRepository) {
        return new ProductCreateUsecase(repository)
      },
      inject: [IProductRepository]
    },
    {
      provide: IProductUpdateAdapter,
      useFactory(repository: IProductRepository) {
        return new ProductUpdateUsecase(repository)
      },
      inject: [IProductRepository]
    },
    {
      provide: IProductDeleteAdapter,
      useFactory(repository: IProductRepository) {
        return new ProductDeleteUsecase(repository)
      },
      inject: [IProductRepository]
    },
    {
      provide: IReviewUpdateAdapter,
      useFactory(repository: IProductRepository) {
        return new ReviewCreateUsecase(repository)
      },
      inject: [IProductRepository]
    }
  ],
  exports: [IProductRepository, IProductCreateAdapter, IProductUpdateAdapter, IProductDeleteAdapter, IReviewUpdateAdapter]
})
export class ProductModule {}
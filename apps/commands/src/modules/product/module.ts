import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCreateHandler } from '../../core/product/handler/product-create';
import { ProductDeleteHandler } from '../../core/product/handler/product-delete';
import { ProductUpdateHandler } from '../../core/product/handler/product-update';
import { IProductRepository } from '../../core/product/repository/product';
import { ProductSchema } from '../../infra/database/postgres/schemas/product';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';
import { ReviewRepositoryProviver } from '../review/providers';
import { IProductCreateHandlerAdapter, IProductDeleteHandlerAdapter, IProductUpdateHandlerAdapter } from './adapter';
import { ProductController } from './controller';
import { ProductRepositoryProviver } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema, ReviewSchema])],
  controllers: [ProductController],
  providers: [
    ProductRepositoryProviver,
    ReviewRepositoryProviver,
    {
      provide: IProductCreateHandlerAdapter,
      useFactory(repository: IProductRepository) {
        return new ProductCreateHandler(repository)
      },
      inject: [IProductRepository]
    },
    {
      provide: IProductUpdateHandlerAdapter,
      useFactory(repository: IProductRepository) {
        return new ProductUpdateHandler(repository)
      },
      inject: [IProductRepository]
    },
    {
      provide: IProductDeleteHandlerAdapter,
      useFactory(repository: IProductRepository) {
        return new ProductDeleteHandler(repository)
      },
      inject: [IProductRepository]
    }
  ],
  exports: [IProductRepository, IProductCreateHandlerAdapter, IProductUpdateHandlerAdapter, IProductDeleteHandlerAdapter]
})
export class ProductModule {}

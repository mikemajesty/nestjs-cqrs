import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCreateHandler } from '../../core/product/handler/product-create';
import { ProductDeleteHandler } from '../../core/product/handler/product-delete';
import { ProductUpdateHandler } from '../../core/product/handler/product-update';
import { IProductRepository } from '../../core/product/repository/product';
import { ProductSchema } from '../../infra/database/postgres/schemas/product';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';
import { IProducerAdapter } from '../../infra/producer/adapter';
import { ProducerModule } from '../../infra/producer/module';
import { ReviewRepositoryProviver } from '../review/providers';
import { IProductCreateHandlerAdapter, IProductDeleteHandlerAdapter, IProductUpdateHandlerAdapter } from './adapter';
import { ProductController } from './controller';
import { ProductRepositoryProviver } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema, ReviewSchema]), ProducerModule],
  controllers: [ProductController],
  providers: [
    ProductRepositoryProviver,
    ReviewRepositoryProviver,
    {
      provide: IProductCreateHandlerAdapter,
      useFactory(repository: IProductRepository, producer: IProducerAdapter) {
        return new ProductCreateHandler(repository, producer)
      },
      inject: [IProductRepository, IProducerAdapter]
    },
    {
      provide: IProductUpdateHandlerAdapter,
      useFactory(repository: IProductRepository, producer: IProducerAdapter) {
        return new ProductUpdateHandler(repository, producer)
      },
      inject: [IProductRepository, IProducerAdapter]
    },
    {
      provide: IProductDeleteHandlerAdapter,
      useFactory(repository: IProductRepository, producer: IProducerAdapter) {
        return new ProductDeleteHandler(repository, producer)
      },
      inject: [IProductRepository, IProducerAdapter]
    }
  ],
  exports: [IProductRepository, IProductCreateHandlerAdapter, IProductUpdateHandlerAdapter, IProductDeleteHandlerAdapter]
})
export class ProductModule {}

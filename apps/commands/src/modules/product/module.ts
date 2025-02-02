import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCreateCommand } from '../../core/product/command/product-create';
import { ProductCreateHandler } from '../../core/product/handler/product-create';
import { IProductRepository } from '../../core/product/repository/product';
import { ProductSchema } from '../../infra/database/postgres/schemas/product';
import { ReviewSchema } from '../../infra/database/postgres/schemas/review';
import { ReviewRepositoryProviver } from '../review/providers';
import { ICommandHandler } from './../../../../../utils/command';
import { ProductRepositoryProviver } from './providers';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema, ReviewSchema])],
  controllers: [],
  providers: [
    ProductRepositoryProviver,
    ReviewRepositoryProviver,
    {
      provide: ICommandHandler<ProductCreateCommand>,
      useFactory(repository: IProductRepository) {
        return new ProductCreateHandler(repository)
      },
      inject: [IProductRepository]
    }
  ],
  exports: [IProductRepository, ICommandHandler<ProductCreateCommand>]
})
export class ProductModule {}

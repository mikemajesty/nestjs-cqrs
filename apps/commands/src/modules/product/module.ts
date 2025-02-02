import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCreateCommand } from '../../core/product/command/product-create';
import { ProductEntity } from '../../core/product/entity/product';
import { ProductCreateHandler } from '../../core/product/handler/product-create';
import { IProductRepository } from '../../core/product/repository/product';
import { ProductSchema } from '../../infra/database/postgres/schemas/product';
import { ReviewModule } from '../review/module';
import { ICommandHandlerAdapter } from './../../../../../utils/command';
import { ProductRepository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductSchema]), ReviewModule],
  controllers: [],
  providers: [
    {
      provide: IProductRepository,
      useFactory: (repository: Repository<ProductSchema & ProductEntity>) => {
        return new ProductRepository(repository);
      },
      inject: [getRepositoryToken(ProductSchema)]
    },
    {
      provide: ICommandHandlerAdapter<ProductCreateCommand>,
      useFactory(repository: IProductRepository) {
        return new ProductCreateHandler(repository)
      },
      inject: [IProductRepository]
    }
  ],
  exports: [IProductRepository, ICommandHandlerAdapter<ProductCreateCommand>]
})
export class ProductModule {}

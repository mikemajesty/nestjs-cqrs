import { Module } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/mongoose';
import mongoose, { Connection, PaginateModel, Schema } from 'mongoose';

import { IProductRepository } from '../../core/product/repository/product';
import { ConnectionName } from '../../infra/database/enum';
import { Product, ProductDocument, ProductSchema } from '../../infra/database/mongo/schemas/product';
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
    }
  ],
  exports: [IProductRepository]
})
export class ProductModule {}
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';

import { MongoRepository } from '@/infra/repository';
import { IProductRepository } from '../../core/product/repository/product';
import { Product, ProductDocument } from '../../infra/database/mongo/schemas/product';

@Injectable()
export class ProductRepository extends MongoRepository<ProductDocument> implements IProductRepository {
  constructor(@InjectModel(Product.name) readonly entity: PaginateModel<ProductDocument>) {
    super(entity);
  }
}
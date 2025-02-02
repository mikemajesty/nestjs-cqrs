import { IRepository } from '@/infra/repository/adapter';

import { ProductEntity } from '../entity/product';

export abstract class IProductRepository extends IRepository<ProductEntity> {}
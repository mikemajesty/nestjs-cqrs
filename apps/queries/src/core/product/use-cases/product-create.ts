import { z } from 'zod';

import { ValidateSchema } from '@/utils/decorators';
import { IUsecase } from '@/utils/usecase';

import { ProductEntity, ProductEntitySchema } from '../entity/product';
import { IProductRepository } from '../repository/product';

export const ProductCreateInputSchema = ProductEntitySchema;

export class ProductCreateUsecase implements IUsecase {

  constructor(private readonly repository: IProductRepository) {}

  @ValidateSchema(ProductCreateInputSchema)
  async execute(input: ProductCreateInput): Promise<ProductCreateOutput> {
    const entity = new ProductEntity(input)

    await this.repository.create(entity)
  }
}

export type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>;
export type ProductCreateOutput = void;

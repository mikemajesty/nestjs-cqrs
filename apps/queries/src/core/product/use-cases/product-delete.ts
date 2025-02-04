import { z } from 'zod';

import { ValidateSchema } from '@/utils/decorators';
import { IUsecase } from '@/utils/usecase';

import { ApiNotFoundException } from '@/utils/exception';
import { ProductEntitySchema } from '../entity/product';
import { IProductRepository } from '../repository/product';

export const ProductDeleteInputSchema = ProductEntitySchema.pick({ id: true });

export class ProductDeleteUsecase implements IUsecase {

  constructor(private readonly repository: IProductRepository) {}

  @ValidateSchema(ProductDeleteInputSchema)
  async execute(input: ProductDeleteInput): Promise<ProductDeleteOutput> {
    const model = await this.repository.findOne({ id: input.id })

    if (!model) {
      throw new ApiNotFoundException('product not found')
    }

    await this.repository.remove({ id: model.id })
  }
}

export type ProductDeleteInput = z.infer<typeof ProductDeleteInputSchema>;
export type ProductDeleteOutput = void;

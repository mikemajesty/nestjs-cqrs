import { z } from 'zod';

import { ValidateSchema } from '@/utils/decorators';
import { IUsecase } from '@/utils/usecase';

import { ApiNotFoundException } from '@/utils/exception';
import { ProductEntity, ProductEntitySchema } from '../entity/product';
import { IProductRepository } from '../repository/product';

export const ProductUpdateInputSchema = ProductEntitySchema.omit({ id: true }).merge(z.object({ id: z.string().uuid() }));

export class ProductUpdateUsecase implements IUsecase {
  constructor(private readonly repository: IProductRepository) {}

  @ValidateSchema(ProductUpdateInputSchema)
  async execute(input: ProductUpdateInput): Promise<ProductUpdateOutput> {
    const model = await this.repository.findOne({ id: input.id })

    if (!model) {
      throw new ApiNotFoundException('product not found')
    }

    const entity = new ProductEntity({ ...model, ...input })

    await this.repository.updateOne({ id: entity.id }, entity)
  }
}

export type ProductUpdateInput = z.infer<typeof ProductUpdateInputSchema>;
export type ProductUpdateOutput = void;

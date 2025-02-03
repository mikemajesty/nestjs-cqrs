

import { ICommand } from '@/utils/command';
import { z } from 'zod';
import { ProductEntitySchema } from '../entity/product';

const ProductUpdateInfo = ProductEntitySchema.pick({ imageUrl: true, name: true, description: true, value: true }).partial()

export const ProductUpdateInputSchema = z.object({ id: z.string().uuid() }).merge(ProductUpdateInfo).strict()

export class ProductUpdateCommand implements ProductUpdateInput, ICommand {
  id!: string

  description!: string

  imageUrl!: string

  name!: string

  value!: number

  constructor(entity: ProductUpdateInput) {
    Object.assign(this, {
      id: entity.id,
      name: entity.name,
      imageUrl: entity.imageUrl,
      value: entity.value,
      description: entity.description
    })
  }
}

type ProductUpdateInput = z.infer<typeof ProductUpdateInputSchema>
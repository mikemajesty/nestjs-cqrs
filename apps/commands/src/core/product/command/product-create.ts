

import { ICommand } from '@/utils/command';
import { z } from 'zod';
import { ProductEntitySchema } from '../entity/product';

export const ProductCreateInputSchema = ProductEntitySchema.pick({ imageUrl: true, name: true, description: true, value: true })

export class ProductCreateCommand implements ProductCreateInput, ICommand {
  readonly imageUrl!: string;

  readonly name!: string;

  readonly description!: string;

  readonly value!: number;

  constructor(entity: ProductCreateInput) {
    this.description = entity?.description as string
    this.name = entity.name
    this.imageUrl = entity.imageUrl
    this.value = entity.value
  }
}

type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>
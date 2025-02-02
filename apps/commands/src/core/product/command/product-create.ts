

import { ICommandAdapter } from '@/utils/command';
import { z } from 'zod';
import { ProductEntitySchema } from '../entity/product';

export const ProductCreateInputSchema = ProductEntitySchema.pick({ imageUrl: true, name: true, description: true, value: true })

export class ProductCreateCommand implements ProductCreateInput, ICommandAdapter {
  imageUrl!: string;

  name!: string;

  description!: string;

  value!: number;
}

type ProductCreateInput = z.infer<typeof ProductCreateInputSchema>
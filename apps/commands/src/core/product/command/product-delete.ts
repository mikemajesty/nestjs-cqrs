

import { ICommand } from '@/utils/command';
import { z } from 'zod';

export const ProductDeleteInputSchema = z.object({ id: z.string().uuid() })

export class ProductDeleteCommand implements ProductDeleteInput, ICommand {
  id!: string

  constructor(entity: ProductDeleteInput) {
    this.id = entity.id
  }
}

type ProductDeleteInput = z.infer<typeof ProductDeleteInputSchema>


import { ICommand } from '@/utils/command';
import { z } from 'zod';
import { ReviewEntitySchema } from '../entity/review';

export const ReviewCreateInputSchema = ReviewEntitySchema.pick({ user: true, rating: true, }).merge(z.object({ productId: z.string().uuid() }))

export class ReviewCreateCommand implements ReviewCreateInput, ICommand {
  readonly user!: string;

  readonly rating!: number;

  readonly productId!: string;

  constructor(input: ReviewCreateInput) {
    this.user = input.user
    this.rating = input.rating
    this.productId = input.productId
  }
}

type ReviewCreateInput = z.infer<typeof ReviewCreateInputSchema>
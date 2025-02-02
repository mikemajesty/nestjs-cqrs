

import { ICommand } from '@/utils/command';
import { z } from 'zod';
import { ReviewEntitySchema } from '../entity/review';

export const ReviewCreateInputSchema = ReviewEntitySchema.pick({ user: true, rating: true, }).merge(z.object({ productId: z.string().uuid() }))

export class ReviewCreateCommand implements ReviewCreateInput, ICommand {
  user!: string;

  rating!: number;

  productId!: string;
}

type ReviewCreateInput = z.infer<typeof ReviewCreateInputSchema>
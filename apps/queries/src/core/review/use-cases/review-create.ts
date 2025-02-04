import { z } from 'zod';

import { ValidateSchema } from '@/utils/decorators';
import { IUsecase } from '@/utils/usecase';

import { ApiNotFoundException } from '@/utils/exception';
import { IProductRepository } from '../../product/repository/product';
import { ReviewEntity, ReviewEntitySchema } from '../entity/review';

export const ReviewCreateInputSchema = ReviewEntitySchema;

export class ReviewCreateUsecase implements IUsecase {
  constructor(private readonly repository: IProductRepository) {}

  @ValidateSchema(ReviewCreateInputSchema)
  async execute(input: ReviewCreateInput): Promise<ReviewCreateOutput> {
    const model = await this.repository.findOne({ id: input.productId })

    if (!model) {
      throw new ApiNotFoundException('product not found')
    }

    model.reviews?.push(new ReviewEntity({ ...input }))

    await this.repository.updateOne({ id: model.id }, model)
  }
}

export type ReviewCreateInput = z.infer<typeof ReviewCreateInputSchema>;
export type ReviewCreateOutput = void;

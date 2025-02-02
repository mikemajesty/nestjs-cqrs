

import { ICommandHandlerAdapter } from '@/utils/command';
import { ValidateSchema } from '@/utils/decorators';
import { ReviewCreateCommand, ReviewCreateInputSchema } from '../command/review-create';
import { ReviewEntity } from '../entity/review';
import { IReviewRepository } from '../repository/review';

export class ReviewCreateHandler implements ICommandHandlerAdapter<ReviewCreateCommand> {
  constructor(private readonly reviewRepository: IReviewRepository) {}

  @ValidateSchema(ReviewCreateInputSchema)
  async execute(command: ReviewCreateCommand): Promise<void> {
    const entity = new ReviewEntity(command)

    await this.reviewRepository.create(entity)
  }
}
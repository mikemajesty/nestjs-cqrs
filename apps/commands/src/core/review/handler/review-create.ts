

import { ICommandHandler } from '@/utils/command';
import { ValidateSchema } from '@/utils/decorators';
import { ApiNotFoundException } from '@/utils/exception';
import { ProductTopics } from '@/utils/topics';
import { IProducerAdapter } from '../../../infra/producer/adapter';
import { DomainEvent, EventEntity } from '../../product/entity/event';
import { IProductRepository } from '../../product/repository/product';
import { ReviewCreateCommand, ReviewCreateInputSchema } from '../command/review-create';
import { ReviewEntity } from '../entity/review';
import { IReviewRepository } from '../repository/review';

export class ReviewCreateHandler implements ICommandHandler<ReviewCreateCommand> {
  constructor(
    private readonly reviewRepository: IReviewRepository,
    private readonly productRepository: IProductRepository,
    private readonly producer: IProducerAdapter
  ) {}

  @ValidateSchema(ReviewCreateInputSchema)
  async execute(command: ReviewCreateCommand): Promise<void> {
    const product = await this.productRepository.findOne({ id: command.productId })

    if (!product) {
      throw new ApiNotFoundException(`product: ${command.productId} not found.`)
    }

    const entity = new ReviewEntity({
      user: command.user,
      rating: command.rating,
      product
    })

    await this.reviewRepository.create(entity)

    await this.producer.publish(ProductTopics.PROCCESS_COMMAND_QUERY, new EventEntity({ event: DomainEvent.REVIEW_CREATED, payload: entity }))
  }
}
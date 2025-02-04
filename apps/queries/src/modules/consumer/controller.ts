import { ProductTopics } from '@/utils/topics';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DomainEvent, EventEntity } from '../../core/product/entity/event';
import { ProductCreateInput } from '../../core/product/use-cases/product-create';
import { ProductDeleteInput } from '../../core/product/use-cases/product-delete';
import { ProductUpdateInput } from '../../core/product/use-cases/product-update';
import { ReviewCreateInput } from '../../core/review/use-cases/review-create';
import { IProductCreateAdapter, IProductDeleteAdapter, IProductUpdateAdapter, IReviewUpdateAdapter } from '../product/adapter';


@Controller()
export class ConsumerController {

  constructor(
    private readonly createUsecase: IProductCreateAdapter,
    private readonly updateUsecase: IProductUpdateAdapter,
    private readonly deleteUsecase: IProductDeleteAdapter,
    private readonly reviewUsecase: IReviewUpdateAdapter,
  ) {}

  @MessagePattern(ProductTopics.PROCCESS_COMMAND_QUERY)
  async notifyEndind(
    @Payload() input: EventEntity,
  ): Promise<void> {
    const execute = {
      [DomainEvent.PRODUCT_CREATED]: () => this.createUsecase.execute(input.payload as ProductCreateInput),
      [DomainEvent.PRODUCT_DELETED]: () => this.deleteUsecase.execute({ id: input.payload } as ProductDeleteInput),
      [DomainEvent.PRODUCT_UPDATED]: () => this.updateUsecase.execute(input.payload as ProductUpdateInput),
      [DomainEvent.REVIEW_CREATED]: () => this.reviewUsecase.execute(input.payload as ReviewCreateInput)
    }[input.event] || (() => console.log('event not found'))

    await execute()
  }
}

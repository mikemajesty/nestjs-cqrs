

import { ValidateSchema } from '@/utils/decorators';
import { ApiNotFoundException } from '@/utils/exception';
import { ProductTopics } from '@/utils/topics';
import { IProducerAdapter } from '../../../infra/producer/adapter';
import { IProductDeleteHandlerAdapter } from '../../../modules/product/adapter';
import { ProductDeleteCommand, ProductDeleteInputSchema } from '../command/product-delete';
import { DomainEvent, EventEntity } from '../entity/event';
import { ProductEntity } from '../entity/product';
import { IProductRepository } from '../repository/product';

export class ProductDeleteHandler implements IProductDeleteHandlerAdapter {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly producer: IProducerAdapter
  ) {}

  @ValidateSchema(ProductDeleteInputSchema)
  async execute(command: ProductDeleteCommand): Promise<void> {
    const found = await this.productRepository.findOne({ id: command.id })

    if (!found) {
      throw new ApiNotFoundException(`product: ${command.id} not found`)
    }

    const entity = new ProductEntity(found)

    await this.productRepository.remove({ id: entity.id })

    await this.producer.publish(ProductTopics.PROCCESS_COMMAND_QUERY, new EventEntity({ event: DomainEvent.PRODUCT_DELETED, payload: entity.id }))
  }
}
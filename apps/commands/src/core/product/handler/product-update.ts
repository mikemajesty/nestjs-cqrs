

import { ValidateSchema } from '@/utils/decorators';
import { ApiNotFoundException } from '@/utils/exception';
import { ProductTopics } from '@/utils/topics';
import { IProducerAdapter } from '../../../infra/producer/adapter';
import { IProductUpdateHandlerAdapter } from '../../../modules/product/adapter';
import { ProductUpdateCommand, ProductUpdateInputSchema } from '../command/product-update';
import { DomainEvent, EventEntity } from '../entity/event';
import { ProductEntity } from '../entity/product';
import { IProductRepository } from '../repository/product';

export class ProductUpdateHandler implements IProductUpdateHandlerAdapter {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly producer: IProducerAdapter
  ) {}

  @ValidateSchema(ProductUpdateInputSchema)
  async execute(command: ProductUpdateCommand): Promise<void> {
    const found = await this.productRepository.findOne({ id: command.id })

    if (!found) {
      throw new ApiNotFoundException(`product: ${command.id} not found`)
    }

    const entity = new ProductEntity({ ...found, ...command })

    await this.productRepository.updateOne({ id: entity.id }, entity)

    const product = await this.productRepository.findOne({ id: entity.id })

    await this.producer.publish(ProductTopics.PROCCESS_COMMAND_QUERY, new EventEntity({ event: DomainEvent.PRODUCT_UPDATED, payload: product }))
  }
}
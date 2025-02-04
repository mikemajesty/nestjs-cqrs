

import { ValidateSchema } from '@/utils/decorators';
import { ProductTopics } from '@/utils/topics';
import { IProducerAdapter } from '../../../infra/producer/adapter';
import { IProductCreateHandlerAdapter } from '../../../modules/product/adapter';
import { ProductCreateCommand, ProductCreateInputSchema } from '../command/product-create';
import { DomainEvent, EventEntity } from '../entity/event';
import { ProductEntity } from '../entity/product';
import { IProductRepository } from '../repository/product';

export class ProductCreateHandler implements IProductCreateHandlerAdapter {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly producer: IProducerAdapter,
  ) {}

  @ValidateSchema(ProductCreateInputSchema)
  async execute(command: ProductCreateCommand): Promise<void> {
    const entity = new ProductEntity(command)

    await this.productRepository.create(entity)

    const product = await this.productRepository.findOne({ id: entity.id })

    await this.producer.publish(ProductTopics.PROCCESS_COMMAND_QUERY, new EventEntity({ event: DomainEvent.PRODUCT_CREATED, payload: product }))
  }
}


import { ICommandHandler } from '@/utils/command';
import { ValidateSchema } from '@/utils/decorators';
import { ProductCreateCommand, ProductCreateInputSchema } from '../command/product-create';
import { ProductEntity } from '../entity/product';
import { IProductRepository } from '../repository/product';

export class ProductCreateHandler implements ICommandHandler<ProductCreateCommand> {
  constructor(private readonly productRepository: IProductRepository) {}

  @ValidateSchema(ProductCreateInputSchema)
  async execute(command: ProductCreateCommand): Promise<void> {
    const entity = new ProductEntity(command)
    await this.productRepository.create(entity)
  }
}
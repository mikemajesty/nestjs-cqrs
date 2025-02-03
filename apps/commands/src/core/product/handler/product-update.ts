

import { ValidateSchema } from '@/utils/decorators';
import { ApiNotFoundException } from '@/utils/exception';
import { IProductUpdateHandlerAdapter } from '../../../modules/product/adapter';
import { ProductUpdateCommand, ProductUpdateInputSchema } from '../command/product-update';
import { ProductEntity } from '../entity/product';
import { IProductRepository } from '../repository/product';

export class ProductUpdateHandler implements IProductUpdateHandlerAdapter {
  constructor(private readonly productRepository: IProductRepository) {}

  @ValidateSchema(ProductUpdateInputSchema)
  async execute(command: ProductUpdateCommand): Promise<void> {
    const found = await this.productRepository.findOne({ id: command.id })

    if (!found) {
      throw new ApiNotFoundException(`product: ${command.id} not found`)
    }

    const entity = new ProductEntity({ ...found, ...command })

    await this.productRepository.updateOne({ id: entity.id }, entity)
  }
}
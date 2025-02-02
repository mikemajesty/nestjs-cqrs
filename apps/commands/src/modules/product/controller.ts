import { ICommandHandler } from '@/utils/command';
import { ApiRequest } from '@/utils/request';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCreateCommand } from '../../core/product/command/product-create';
import { SwaggerRequest, SwaggerResponse } from './swagger';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(private readonly createProductHandler: ICommandHandler<ProductCreateCommand>) {}

  @Post()
  @ApiResponse(SwaggerResponse.create[200])
  @ApiBody(SwaggerRequest.create)
  async createProduct(@Req() { body }: ApiRequest): Promise<void> {
    return await this.createProductHandler.execute(new ProductCreateCommand(body))
  }
}

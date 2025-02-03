import { ApiRequest } from '@/utils/request';
import { Controller, Delete, Post, Put, Req } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCreateCommand } from '../../core/product/command/product-create';
import { ProductDeleteCommand } from '../../core/product/command/product-delete';
import { ProductUpdateCommand } from '../../core/product/command/product-update';
import { IProductCreateHandlerAdapter, IProductDeleteHandlerAdapter, IProductUpdateHandlerAdapter } from './adapter';
import { SwaggerRequest, SwaggerResponse } from './swagger';

@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(
    private readonly createProductHandler: IProductCreateHandlerAdapter,
    private readonly updateProductHandler: IProductUpdateHandlerAdapter,
    private readonly deleteProductHandler: IProductDeleteHandlerAdapter,
  ) {}

  @Post()
  @ApiResponse(SwaggerResponse.create[200])
  @ApiBody(SwaggerRequest.create)
  async createProduct(@Req() { body }: ApiRequest): Promise<void> {
    return await this.createProductHandler.execute(new ProductCreateCommand(body))
  }

  @Put('/:id')
  @ApiParam({ name: 'id', required: true, allowEmptyValue: false })
  @ApiResponse(SwaggerResponse.update[200])
  @ApiBody(SwaggerRequest.update)
  async updateProduct(@Req() { body, params }: ApiRequest): Promise<void> {
    return await this.updateProductHandler.execute(new ProductUpdateCommand({ ...body, id: params.id }))
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, allowEmptyValue: false })
  @ApiResponse(SwaggerResponse.update[200])
  async deleteProduct(@Req() { params }: ApiRequest): Promise<void> {
    return await this.deleteProductHandler.execute(new ProductDeleteCommand({ id: params.id as string }))
  }
}

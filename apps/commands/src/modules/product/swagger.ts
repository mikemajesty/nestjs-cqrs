import { Swagger } from '@/utils/docs/swagger';
import { ProductCreateCommand } from '../../core/product/command/product-create';
import { ProductUpdateCommand } from '../../core/product/command/product-update';

export const SwaggerResponse = {
  create: {
    200: Swagger.defaultResponseJSON<void>({
      status: 200,
      description: 'product created.'
    })
  },
  update: {
    200: Swagger.defaultResponseJSON<void>({
      status: 200,
      description: 'product updated.'
    })
  },
  delete: {
    200: Swagger.defaultResponseJSON<void>({
      status: 200,
      description: 'product deleted.'
    })
  }
};

export const SwaggerRequest = {
  create: Swagger.defaultRequestJSON<ProductCreateCommand>({ description: "telefone movel", imageUrl: 'https://mikemajesty.github.io/img/img.b3772f0f.jpeg', name: "GitHub", value: 10 }),
  update: Swagger.defaultRequestJSON<ProductUpdateCommand>({ id: '<uuid>', description: "telefone movel", imageUrl: 'https://mikemajesty.github.io/img/img.b3772f0f.jpeg', name: "GitHub", value: 10 }),
};

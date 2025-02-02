import { Swagger } from '@/utils/docs/swagger';
import { ReviewCreateCommand } from '../../core/review/command/review-create';

export const SwaggerResponse = {
  create: {
    200: Swagger.defaultResponseJSON<void>({
      status: 200,
      description: 'review created.'
    })
  }
};

export const SwaggerRequest = {
  create: Swagger.defaultRequestJSON<ReviewCreateCommand>({ productId: 'uuid', rating: 5, user: "Github" }),
};

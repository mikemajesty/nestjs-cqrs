import { ICommandHandler } from '@/utils/command';
import { ApiRequest } from '@/utils/request';
import { Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReviewCreateCommand } from '../../core/review/command/review-create';
import { SwaggerRequest, SwaggerResponse } from './swagger';

@Controller('reviews')
@ApiTags('reviews')
export class ReviewController {
  constructor(private readonly createReviewHandler: ICommandHandler<ReviewCreateCommand>) {}

  @Post()
  @ApiResponse(SwaggerResponse.create[200])
  @ApiBody(SwaggerRequest.create)
  async createReview(@Req() { body }: ApiRequest): Promise<void> {
    return await this.createReviewHandler.execute(new ReviewCreateCommand(body))
  }
}

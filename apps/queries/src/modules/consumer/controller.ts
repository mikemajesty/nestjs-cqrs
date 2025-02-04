import { ProductTopics } from '@/utils/topics';
import { Controller } from '@nestjs/common';
import {
  MessagePattern,
  Payload
} from '@nestjs/microservices';
import { EventEntity } from '../../core/product/entity/event';


@Controller()
export class ConsumerController {

  @MessagePattern(ProductTopics.PROCCESS_COMMAND_QUERY)
  async notifyEndind(
    @Payload() input: EventEntity,
  ): Promise<void> {
    console.log('EVENTO' + input.event, input.payload);
  }
}

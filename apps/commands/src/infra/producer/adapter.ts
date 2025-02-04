import { ClientKafka } from '@nestjs/microservices';
import { EventEntity } from '../../core/product/entity/event';

export abstract class IProducerAdapter {
  client!: ClientKafka;
  abstract publish(topic: string, input: EventEntity): Promise<void>;
}

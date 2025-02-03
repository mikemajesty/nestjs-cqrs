import { ClientKafka } from '@nestjs/microservices';

export abstract class IProducerAdapter {
  client!: ClientKafka;
  abstract publish<T>(payload: T, topic: string): Promise<void>;
}

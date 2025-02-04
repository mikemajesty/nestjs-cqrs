import { Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

import { ILoggerAdapter } from '@/infra/logger';

import { EventEntity } from '../../core/product/entity/event';
import { IKafkaAdapter } from '../kafka/adapter';
import { IProducerAdapter } from './adapter';

@Injectable()
export class ProducerService implements IProducerAdapter {
  client: ClientKafka;

  constructor(
    kafka: IKafkaAdapter,
    private readonly logger: ILoggerAdapter,
  ) {
    this.client = kafka.client;
  }

  async publish(topic: string, input: EventEntity): Promise<void> {
    return new Promise((res) => {
      this.client
        .emit<string, string>(topic, JSON.stringify(input))
        .subscribe({
          error: (error) => {
            res(error);
          },
          complete: () => {
            this.logger.info({
              message: `message sent to topic: ${topic}`,
            });
            res();
          },
        });
    });
  }
}

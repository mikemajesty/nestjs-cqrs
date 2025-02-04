import { Module } from '@nestjs/common';
import {
  ClientKafka, ClientProvider,
  ClientsModule,
  Transport
} from '@nestjs/microservices';

import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';

import { IKafkaAdapter } from './adapter';
import { KafkaService } from './service';

@Module({
  imports: [
    SecretsModule,
    ClientsModule.registerAsync({
      clients: [
        {
          imports: [SecretsModule],
          useFactory: (secret: ISecretsAdapter): ClientProvider => {
            return {
              transport: Transport.KAFKA,
              options: {
                client: {
                  clientId: secret.API.QUERIES.KAFKA.CLIENT_ID,
                  brokers: [secret.KAFKA_BROKER],
                },
                consumer: {
                  groupId: secret.API.QUERIES.KAFKA.GROUP_ID
                },
                run: { autoCommit: true },
              },
            };
          },
          inject: [ISecretsAdapter],
          name: IKafkaAdapter.name,
        },
      ],
    }),
  ],
  providers: [
    {
      provide: IKafkaAdapter,
      useFactory(kafka: ClientKafka) {
        return new KafkaService(kafka);
      },
      inject: [{ token: IKafkaAdapter.name, optional: false }],
    },
  ],
  exports: [IKafkaAdapter],
})
export class KafkaModule {}

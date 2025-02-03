import { Module } from '@nestjs/common';

import { PostgresDatabaseModule } from './database/postgres';
import { KafkaModule } from './kafka/module';
import { ProducerModule } from './producer/module';

@Module({
  imports: [PostgresDatabaseModule, KafkaModule, ProducerModule],
  exports: [PostgresDatabaseModule, KafkaModule, ProducerModule]
})
export class InfraModule {}

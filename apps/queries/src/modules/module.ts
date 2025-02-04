import { LoggerModule } from '@/infra/logger';
import { SecretsModule } from '@/infra/secrets';
import { Module } from '@nestjs/common';
import { KafkaModule } from '../infra/kafka/module';
import { InfraModule } from '../infra/module';
import { ConsumerModule } from './consumer/module';
import { HealthModule } from './health/module';
import { ProductModule } from './product/module';

@Module({
  imports: [HealthModule, LoggerModule, SecretsModule, InfraModule, KafkaModule, ConsumerModule, ProductModule],
  controllers: [],
  providers: [],
})
export class QueriesModule {}

import { LoggerModule } from '@/infra/logger';
import { SecretsModule } from '@/infra/secrets';
import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/module';
import { HealthModule } from './health/module';

@Module({
  imports: [HealthModule, LoggerModule, SecretsModule, InfraModule],
  controllers: [],
  providers: [],
})
export class QueriesModule {}

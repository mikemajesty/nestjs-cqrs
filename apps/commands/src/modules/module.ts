import { LoggerModule } from '@/infra/logger';
import { SecretsModule } from '@/infra/secrets';
import { Module } from '@nestjs/common';
import { InfraModule } from '../infra/module';
import { HealthModule } from './health/module';
import { ProductModule } from './product/module';
import { ReviewModule } from './review/module';

@Module({
  imports: [HealthModule, LoggerModule, SecretsModule, InfraModule, ProductModule, ReviewModule],
  controllers: [],
  providers: [],
})
export class CommandModule {}

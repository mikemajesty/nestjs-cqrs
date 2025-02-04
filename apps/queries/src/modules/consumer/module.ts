import { Module } from '@nestjs/common';


import { KafkaModule } from '../../infra/kafka/module';
import { ProductModule } from '../product/module';
import { ConsumerController } from './controller';

@Module({
  imports: [KafkaModule, ProductModule],
  controllers: [ConsumerController],
  providers: [],
  exports: [],
})
export class ConsumerModule {}

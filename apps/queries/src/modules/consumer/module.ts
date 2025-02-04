import { Module } from '@nestjs/common';


import { KafkaModule } from '../../infra/kafka/module';
import { ConsumerController } from './controller';

@Module({
  imports: [KafkaModule],
  controllers: [ConsumerController],
  providers: [

  ],
  exports: [],
})
export class ConsumerModule {}

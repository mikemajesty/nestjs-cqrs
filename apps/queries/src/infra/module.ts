import { Module } from '@nestjs/common';

import { MongoDatabaseModule } from './database/mongo';

@Module({
  imports: [MongoDatabaseModule],
  exports: [MongoDatabaseModule]
})
export class InfraModule {}

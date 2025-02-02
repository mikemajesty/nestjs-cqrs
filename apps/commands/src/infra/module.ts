import { Module } from '@nestjs/common';

import { PostgresDatabaseModule } from './database/postgres';

@Module({
  imports: [PostgresDatabaseModule],
  exports: [PostgresDatabaseModule]
})
export class InfraModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ISecretsAdapter, SecretsModule } from '@/infra/secrets';

import { ProductSchema } from './schemas/product';
import { ReviewSchema } from './schemas/review';
import { PostgresService } from './service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ({ API: { COMMANDS: { DATABASE: { HOST, PORT, USER, PASSWORD, DATABASE } } }, IS_LOCAL }: ISecretsAdapter) => {
        const uri = `postgresql://${USER}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`
        const conn = new PostgresService().getConnection({ URI: uri });
        console.log('object', path.join(__dirname, '/schemas/*.{ts,js}'));
        return {
          ...conn,
          timeout: 5000,
          connectTimeout: 5000,
          logging: IS_LOCAL,
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
          synchronize: IS_LOCAL,
          migrationsTableName: 'migrations',
          migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
          entities: [ProductSchema, ReviewSchema]
        };
      },
      async dataSourceFactory(options) {
        const dataSource = new DataSource(options as DataSourceOptions);
        return dataSource.initialize();
      },
      imports: [SecretsModule],
      inject: [ISecretsAdapter]
    })
  ]
})
export class PostgresDatabaseModule {}

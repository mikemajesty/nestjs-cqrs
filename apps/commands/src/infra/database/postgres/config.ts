import { config } from 'dotenv';
import path from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

config();

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.COMMANDS_DATABASE_HOST,
  port: Number(process.env.COMMANDS_DATABASE_PORT),
  username: process.env.COMMANDS_DATABASE_USER,
  password: process.env.COMMANDS_DATABASE_PASSWORD,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  database: process.env.COMMANDS_DATABASE_DATABASE,
  migrationsTableName: 'migrations',
  migrations: [path.join(__dirname, '/migrations/*.{ts,js}')],
  entities: [path.join(__dirname, '/schemas/*.{ts,js}')]
});

export default dataSource;

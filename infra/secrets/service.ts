import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ISecretsAdapter } from './adapter';
import { EnvEnum } from './types';

@Injectable()
export class SecretsService implements ISecretsAdapter {
  constructor(private readonly config: ConfigService) {}

  IS_LOCAL = this.config.get<EnvEnum>('NODE_ENV') === EnvEnum.LOCAL;

  KAFKA_BROKER = this.config.get<String>('KAFKA_BROKER') as string;

  IS_PRODUCTION = this.config.get<EnvEnum>('NODE_ENV') === EnvEnum.PRD;

  ENV = this.config.get<EnvEnum>('NODE_ENV') as string;

  LOG_LEVEL = this.config.get('LOG_LEVEL');

  DATE_FORMAT = this.config.get('DATE_FORMAT');

  TZ = this.config.get('TZ');

  API = {
    COMMANDS: {
      PORT: this.config.get<string | number>('COMMANDS_PORT') as string | number,
      HOST: this.config.get<string>('COMMANDS_HOST') as string,
      DATABASE: {
        HOST: this.config.get<string>('COMMANDS_DATABASE_HOST') as string,
        PORT: this.config.get<string | number>('COMMANDS_DATABASE_PORT') as string | number,
        USER: this.config.get<string>('COMMANDS_DATABASE_USER') as string,
        PASSWORD: this.config.get<string>('COMMANDS_DATABASE_PASSWORD') as string,
        DATABASE: this.config.get<string>('COMMANDS_DATABASE_DATABASE') as string
      },
      KAFKA: {
        CLIENT_ID: this.config.get<string>('COMMANDS_KAFKA_CLIENT_ID') as string,
        GROUP_ID: this.config.get<string>('COMMANDS_KAFKA_GROUP_ID') as string
      }
    },
    QUERIES: {
      PORT: this.config.get<string | number>('QUERIES_PORT') as string | number,
      HOST: this.config.get<string>('QUERIES_HOST') as string,
      DATABASE: {
        HOST: this.config.get<string>('QUERIES_DATABASE_HOST') as string,
        PORT: this.config.get<string | number>('QUERIES_DATABASE_PORT') as string | number,
        USER: this.config.get<string>('QUERIES_DATABASE_USER') as string,
        PASSWORD: this.config.get<string>('QUERIES_DATABASE_PASSWORD') as string,
        DATABASE: this.config.get<string>('QUERIES_DATABASE_DATABASE') as string
      },
      KAFKA: {
        CLIENT_ID: this.config.get<string>('QUERIES_KAFKA_CLIENT_ID') as string,
        GROUP_ID: this.config.get<string>('QUERIES_KAFKA_GROUP_ID') as string
      }
    }
  };
}

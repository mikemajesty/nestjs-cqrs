import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { z, ZodError, ZodIssue } from 'zod';

import { ApiInternalServerException } from '@/utils/exception';
import { ZodInferSchema } from '@/utils/types';

import { LogLevelEnum } from '../logger';
import { ISecretsAdapter } from './adapter';
import { SecretsService } from './service';
import { EnvEnum } from './types';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    })
  ],
  providers: [
    {
      provide: ISecretsAdapter,
      useFactory: (config: ConfigService) => {
        const SecretsSchema = z.object<ZodInferSchema<ISecretsAdapter>>({
          ENV: z.nativeEnum(EnvEnum),
          IS_LOCAL: z.boolean(),
          KAFKA_BROKER: z.string(),
          IS_PRODUCTION: z.boolean(),
          LOG_LEVEL: z.nativeEnum(LogLevelEnum),
          DATE_FORMAT: z.string(),
          TZ: z.string(),
          API: z.object({
            COMMANDS: z.object({
              PORT: z.string().or(z.number()).transform(v => Number(v)),
              HOST: z.string(),
              DATABASE: z.object({
                HOST: z.string(),
                PORT: z.string().or(z.number()).transform(v => Number(v)),
                USER: z.string(),
                PASSWORD: z.string(),
                DATABASE: z.string()
              }),
              KAFKA: z.object({
                CLIENT_ID: z.string(),
                GROUP_ID: z.string()
              })
            }),
            QUERIES: z.object({
              PORT: z.string().or(z.number()).transform(v => Number(v)),
              HOST: z.string(),
              DATABASE: z.object({
                HOST: z.string(),
                PORT: z.string().or(z.number()).transform(v => Number(v)),
                USER: z.string(),
                PASSWORD: z.string(),
                DATABASE: z.string()
              }),
              KAFKA: z.object({
                CLIENT_ID: z.string(),
                GROUP_ID: z.string()
              })
            }),
          })
        });
        const secret = new SecretsService(config);

        try {
          SecretsSchema.parse(secret);
        } catch (error) {
          const zodError = error as ZodError;
          const message = zodError.issues
            .map((i: ZodIssue) => `${SecretsService.name}.${i.path.join('.')}: ${i.message}`)
            .join(',');
          throw new ApiInternalServerException(message);
        }

        return SecretsSchema.parse(secret);
      },
      inject: [ConfigService]
    }
  ],
  exports: [ISecretsAdapter]
})
export class SecretsModule {}

import { ErrorType, ILoggerAdapter } from '@/infra/logger';
import { ISecretsAdapter } from '@/infra/secrets';
import { RequestMethod, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { bold } from 'colorette';
import 'dotenv/config';
import { Kafka } from 'kafkajs';
import { name, version } from '../package.json';
import { QueriesModule } from './modules/module';

async function bootstrap() {
  const app = await NestFactory.create(QueriesModule, {
    cors: true,
    bufferLogs: true,
  });

  const {
    ENV,
    KAFKA_BROKER,
    IS_PRODUCTION,
    API: { QUERIES: { HOST, PORT, KAFKA: { CLIENT_ID, GROUP_ID } } }
  } = app.get(ISecretsAdapter);
  const logger = app.get(ILoggerAdapter);

  const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [KAFKA_BROKER],
        clientId: CLIENT_ID,
      },
      consumer: {
        groupId: GROUP_ID,
        readUncommitted: true,
        retry: {
          retries: 5,
        },
      },
      producer: {
        allowAutoTopicCreation: true,
      },
      subscribe: {
        fromBeginning: true,
      },
      run: { autoCommit: false },
    },
  });

  logger.setApplication(name);
  app.useLogger(logger);

  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'health', method: RequestMethod.GET },
      { path: '/', method: RequestMethod.GET },
    ],
  });

  app.enableVersioning({ type: VersioningType.URI });

  process.on('uncaughtException', (error) => {
    logger.error(error as ErrorType);
  });

  process.on('unhandledRejection', (error) => {
    logger.error(error as ErrorType);
  });

  const kafka = new Kafka({
    clientId: CLIENT_ID,
    brokers: [KAFKA_BROKER],
  });

  const admin = kafka.admin();
  await admin.connect();
  await admin.createTopics({
    topics: [],
    waitForLeaders: true,
  });

  await admin.disconnect();

  const config = new DocumentBuilder()
    .setTitle(name)
    .addBearerAuth()
    .setVersion(version)
    .addServer(HOST)
    .addTag('Swagger Documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await kafkaMicroservice.listen();

  await app.listen(PORT, () => {
    logger.log(
      `🟢 ${name} listening at ${bold(PORT)} on ${bold(ENV?.toUpperCase())} 🟢`,
    );
    if (!IS_PRODUCTION)
      logger.log(`🟢 Swagger listening at ${bold(`${HOST}/docs`)} 🟢`);

  });
}
bootstrap();

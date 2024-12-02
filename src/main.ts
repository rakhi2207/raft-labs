import { NestFactory } from '@nestjs/core';
import { appConfig } from './config/app.config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { Logger, LoggerErrorInterceptor, PinoLogger } from 'nestjs-pino';
import { CoreModule } from './core/core.module';

const SWAGGER_PREFIX = `${appConfig.apiPrefix}/swagger`;
const SERVER_BASE_URL = `https://raft-labs.onrender.com`;
const SWAGGER_URL = `${SERVER_BASE_URL}${SWAGGER_PREFIX}`;
const SERVER_URL = `${SERVER_BASE_URL}${appConfig.apiPrefix}`;

function createSwagger(app: INestApplication) {
  const SWAGGER_TITLE = 'RaftLabs';
  const SWAGGER_DESCRIPTION = '';
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(CoreModule);
  app.setGlobalPrefix(appConfig.apiPrefix);
  if (appConfig.enableSwagger) {
    createSwagger(app);
  }
  app.enableCors();
  app.use(json({ limit: '500kb' }));
  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const logger = new PinoLogger({});
  await app.listen(appConfig.port);
  logger.info(`RafterLabs - Assignment Running at: ${SERVER_URL}`);
  if (appConfig.enableSwagger) {
    logger.info(`RafterLabs - Assignment Running at:: ${SWAGGER_URL}`);
  }
}
bootstrap();

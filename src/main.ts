import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';

import { logger } from './middleware/logger.middleware';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { AnyExceptionFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/nest-on');
  app.use(express.json()); // For parsing application/json
  app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
  app.use(logger);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AnyExceptionFilter()); // 要在HttpExceptionFilter，否则HttpExceptionFilter不生效
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();

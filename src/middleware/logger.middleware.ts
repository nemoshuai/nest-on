import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '../utils/log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    logger(req, res, next);
  }
}

// 函数式
export function logger(req: Request, res: Response, next: () => any) {
  next();
  const { statusCode } = res;
  const logFormat = `
  >>>
  Method: ${req.method}
  Request url: ${req.originalUrl}
  Status Code: ${statusCode}
  IP: ${req.ip}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)}
  >>>
  `;

  if (statusCode >= 500) {
    Logger.error(logFormat);
  } else if (statusCode >= 400) {
    Logger.warn(logFormat);
  } else {
    Logger.access(logFormat);
    Logger.log(logFormat);
  }
}

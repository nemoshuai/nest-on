import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '../utils/log4js';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const logFormat = `
    >>>
    Request Origin Url: ${request.originalUrl}
    Method: ${request.method}
    IP: ${request.ip}
    STATUS CODE: ${status}
    EXCEPTION: ${exception.message}
    <<<
    `;

    Logger.info(logFormat);

    response.status(status).json({
      statusCode: status,
      time: new Date().valueOf(),
      url: request.url,
      error: exception.message,
    });
  }
}

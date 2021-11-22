import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Logger } from '../utils/log4js';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(1).req;
    return next.handle().pipe(
      map(data => {
        // req.user 加了@UseGuards(AuthGuard('jwt'))，req会绑定user
        const logFormat = `
          >>>
          Request Origin Url: ${req.originalUrl}
          Method: ${req.method}
          IP: ${req.ip}
          User: ${JSON.stringify(req.user)}
          Request Data: ${JSON.stringify(data.data)}
          <<<<
        `;

        Logger.info(logFormat);
        Logger.access(logFormat);
        return data;
      }),
    );
  }
}

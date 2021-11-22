import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Logger } from '../utils/log4js';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || this.toValidate(metatype)) {
      // 没有设置该类型校验 或者没有类型
      return value;
    }

    const target = plainToClass(metatype, value);
    console.log('object', target);
    return;
    const error = await validate(target);
    if (error.length) {
      const errorMsg = Object.values(error[0].constraints)[0];
      Logger.error('validation error', errorMsg);
      return new BadRequestException(`validation failed: ${errorMsg}`);
    }
    return value;
  }

  private toValidate(metatype) {
    const types = [String, Number, Boolean, Array, Object];
    return !types.includes(metatype);
  }
}

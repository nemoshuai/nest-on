import { IsNotEmpty,IsString } from "class-validator";

export class RegisterInfoDTO {
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string | number;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
  @IsString({ message: '真实姓名是字符串' })
  readonly realName: string;
  @IsNotEmpty({ message: '手机号不能为空' })
  readonly mobile: string;
}

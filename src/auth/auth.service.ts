import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { encryptPassword } from 'src/utils/cryptogram';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    console.log('JWT验证 - Step 2: 校验用户信息');

    const user = await this.userService.findOne(username);
    if (user && user.username === username) {
      const { password: pwd, passwd_salt: salt } = user;
      console.log(password, pwd, salt);
      const enPassword = encryptPassword(password, salt);
      if (pwd === enPassword) {
        return {
          code: 0,
          success: true,
          data: {
            user,
          },
          msg: '',
        };
      }

      return {
        code: -1,
        msg: '密码不对',
        success: false,
      };
    }

    return {
      code: -1,
      msg: '没这个人',
      success: false,
    };
  }

  async certificate(user: any) {
    console.log('3-jwt处理 token');
    const { userId, username, realName, role } = user;
    const payload = {
      userId,
      username,
      realName,
      role,
    };

    try {
      const token = this.jwtService.sign(payload);
      return {
        code: 0,
        data: {
          token,
        },
        msg: '',
        success: true,
      };
    } catch (error) {
      return {
        code: -1,
        msg: '账户错误',
      };
    }
  }
}

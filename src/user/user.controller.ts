import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from './user.service';
import { ValidationPipe } from '../pipe/validation.pipe';
import { RegisterInfoDTO } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/:username')
  async findOne(@Param('username') username: string) {
    const user = await this.userService.findOne(username);
    if (user) {
      return {
        code: 0,
        data: {
          user,
        },
        msg: 'success',
      };
    }

    return {
      code: -1,
      msg: '用户不存在',
    };
  }

  @Post('/register')
  async register(@Body(new ValidationPipe()) body: RegisterInfoDTO) {
    debugger;
    return await this.userService.register(body);
  }

  @Post('login')
  async login(@Body() loginParams: any) {
    console.log('JWT-1,  用户请求登陆');
    const { username, password } = loginParams;
    const authRes = await this.authService.validateUser(username, password);
    if (authRes.code === 0) {
      const res = await this.authService.certificate(authRes.data.user);
      return res;
    }

    return authRes;
  }
}

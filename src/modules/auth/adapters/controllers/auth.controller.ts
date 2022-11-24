import { Controller, Inject, Post, Body, HttpCode } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IUserService } from '@auth/application/services/user-service.interface';
import { SignupRequestDto } from '@auth/application/dto/signup-request.dto';
import { LoginRequestDto } from '@auth/application/dto/login-request.dto';

@Controller()
@ApiTags('Auth')
export class AuthController {
  /**
   *
   */
  constructor(
    @Inject('UserService')
    private readonly userService: IUserService,
  ) {}

  @Post('signup')
  async signup(@Body() payload: SignupRequestDto) {
    return await this.userService.signup(payload);
  }

  @Post('login')
  @HttpCode(200)
  async signin(@Body() payload: LoginRequestDto) {
    return await this.userService.signin(payload);
  }
}

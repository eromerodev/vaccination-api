import { LoginRequestDto } from '@auth/application/dto/login-request.dto';

export class ValidateUserQuery {
  constructor(public loginRequestDto: LoginRequestDto) {}
}

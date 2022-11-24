import { LoginRequestDto } from '../../../application/dto/login-request.dto';

export class ValidateUserQuery {
  constructor(public loginRequestDto: LoginRequestDto) {}
}

import { SignupRequestDto } from '../../dto/signup-request.dto';

export class CreateUserCommand {
  constructor(public signupRequestDto: SignupRequestDto) {}
}

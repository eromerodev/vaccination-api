import { UserAccountDto } from '../dto/user-account.dto';
import { UserTokenDto } from '../dto/user-token.dto';
import { SignupRequestDto } from '../dto/signup-request.dto';
import { LoginRequestDto } from '../dto/login-request.dto';

export interface IUserService {
  signup(signupRequestDto: SignupRequestDto): Promise<UserAccountDto>;
  signin(loginRequestDto: LoginRequestDto): Promise<UserTokenDto>;
}

import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IUserService } from './user-service.interface';
import { CreateUserCommand } from '../cqrs/command/create-user.command';
import { ValidateUserQuery } from '../cqrs/query/validate-user.query';
import { SignupRequestDto } from '../dto/signup-request.dto';
import { UserAccountDto } from '../dto/user-account.dto';
import { LoginRequestDto } from '../dto/login-request.dto';
import { UserTokenDto } from '../dto/user-token.dto';

@Injectable()
export class UserService implements IUserService {
  /**
   *
   */
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async signup(signupRequestDto: SignupRequestDto): Promise<UserAccountDto> {
    return await this.commandBus.execute(
      new CreateUserCommand(signupRequestDto),
    );
  }

  async signin(loginRequestDto: LoginRequestDto): Promise<UserTokenDto> {
    return await this.queryBus.execute(new ValidateUserQuery(loginRequestDto));
  }
}

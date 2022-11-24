import * as bcrypt from 'bcrypt';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@shared/auth/jwt-payload.interface';
import { UserTokenDto } from '@auth/application/dto/user-token.dto';
import { ValidateUserQuery } from './validate-user.query';
import { IUserRepository } from '@auth/domain/interfaces/user-repository.interface';

@QueryHandler(ValidateUserQuery)
export class ValidateUserHandler
  implements IQueryHandler<ValidateUserQuery, UserTokenDto>
{
  /**
   *
   */
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(query: ValidateUserQuery): Promise<UserTokenDto> {
    const user = await this.userRepository.findByEmail(
      query.loginRequestDto.email,
    );

    const { password } = query.loginRequestDto;
    if (!user.id || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload: JwtPayload = { email: user.email };
    const accessToken: string = this.jwtService.sign(payload);
    return { access_token: accessToken };
  }
}

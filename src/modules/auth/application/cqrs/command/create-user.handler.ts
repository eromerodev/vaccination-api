import * as bcrypt from 'bcrypt';
import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserAccountDto } from '@auth/application/dto/user-account.dto';
import { CreateUserCommand } from './create-user.command';
import { IUserRepository } from '@auth/domain/interfaces/user-repository.interface';
import { UserAccount } from '@auth/domain/entities/user-account';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, UserAccountDto>
{
  /**
   *
   */
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserAccountDto> {
    const { name, email, password } = command.signupRequestDto;
    const currentUser = await this.userRepository.findByEmail(email);
    if (currentUser.id) {
      throw new ConflictException(`User ${email} already exists`);
    }

    const salt = await bcrypt.genSalt();
    const newUserAccount = new UserAccount();
    newUserAccount.name = name;
    newUserAccount.email = email;
    newUserAccount.password = await bcrypt.hash(password, salt);

    const output = await this.userRepository.save(newUserAccount);
    return output as UserAccountDto;
  }
}

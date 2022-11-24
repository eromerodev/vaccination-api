import * as bcrypt from 'bcrypt';
import { ConflictException, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserAccountDto } from '../../../application/dto/user-account.dto';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';
import { UserAccount } from '../../../domain/entities/user-account';
import { CreateUserCommand } from './create-user.command';

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

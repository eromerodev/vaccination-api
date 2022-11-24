import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../../../domain/interfaces/user-repository.interface';
import { UserAccount } from '../../../domain/entities/user-account';
import { UserEntity } from '../models/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  /**
   *
   */
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: UserAccount): Promise<UserAccount> {
    const entity = await this.repository.save({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return entity as UserAccount;
  }

  async findByEmail(email: string): Promise<UserAccount> {
    const query = this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const entity = await query.getOne();
    if (!entity) return new UserAccount();
    return entity as UserAccount;
  }
}

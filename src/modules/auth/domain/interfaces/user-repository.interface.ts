import { UserAccount } from '../entities/user-account';

export interface IUserRepository {
  save(user: UserAccount): Promise<UserAccount>;
  findByEmail(email: string): Promise<UserAccount>;
}

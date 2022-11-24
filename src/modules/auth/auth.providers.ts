import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './adapters/db/repositories/user-repository';
import { CreateUserHandler } from './application/cqrs/command/create-user.handler';
import { ValidateUserHandler } from './application/cqrs/query/validate-user.handler';
import { UserService } from './application/services/user.service';

export const CommandHandlers = [CreateUserHandler];
export const QueryHandlers = [ValidateUserHandler];
export const Services = [
  {
    provide: 'UserService',
    useClass: UserService,
  },
];
export const Repositories = [
  {
    provide: 'UserRepository',
    useClass: UserRepository,
  },
];

export const AuthProviders = [
  JwtStrategy,
  ...CommandHandlers,
  ...QueryHandlers,
  ...Services,
  ...Repositories,
];

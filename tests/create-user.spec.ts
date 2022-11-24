import { Test } from '@nestjs/testing';
import { CreateUserCommand } from '../src/modules/auth/application/cqrs/command/create-user.command';
import { CreateUserHandler } from '../src/modules/auth/application/cqrs/command/create-user.handler';

const mockUserRepository = () => ({
  save: jest.fn(),
  findByEmail: jest.fn(),
});

const signupRequestDto = {
  name: '',
  email: 'test@test.com',
  password: '2dc5j2fxk',
};

const createUserResult = {
  email: 'test@test.com',
  password: '$2b$10$7UMhN8zNpJEBSqQ/Xu8/DO12XODfAS06MW76K1ztPtrIJ7e5B4c92',
  id: 10,
};

describe('CreateUserHandler', () => {
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: 'UserRepository',
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = module.get('UserRepository');
  });

  describe('signup', () => {
    it('create user account', async () => {
      userRepository.findByEmail.mockResolvedValue({});
      userRepository.save.mockResolvedValue(createUserResult);
      const createUserHandler = new CreateUserHandler(userRepository);
      const result = await createUserHandler.execute(
        new CreateUserCommand({ ...signupRequestDto }),
      );

      expect(result.id).toEqual(10);
      expect(result.email).toEqual('test@test.com');
    });
  });
});

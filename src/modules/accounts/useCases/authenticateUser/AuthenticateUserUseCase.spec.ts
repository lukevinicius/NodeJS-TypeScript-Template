import { AppError } from '@shared/errors/AppError';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able authenticate an user', async () => {
    const user: ICreateUserDTO = {
      email: 'user@example.com',
      password: 'password',
      username: 'user',
      name: 'user',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should no be able to authenticate an non existing user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'foo@bar.com',
        password: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        email: 'user@example.com',
        password: 'password',
        username: 'user',
        name: 'user',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

import { ICreateUserDTO } from '@modules/account/dto/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersTokenRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';

import { CreateAuthenticateUseCase } from './CreateAuthenticateUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createAuthenticateUseCase: CreateAuthenticateUseCase;
let createUserUseCase: CreateUserUseCase;
let usersTokenRepository: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Create Authenticate User', () => {
  const userMoke: ICreateUserDTO = {
    driver_license: '002992',
    email: 'user@test.com',
    name: 'user test',
    password: '12345',
  };
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokenRepository = new UsersTokenRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createAuthenticateUseCase = new CreateAuthenticateUseCase(
      usersRepositoryInMemory,
      usersTokenRepository,
      dateProvider
    );

    await createUserUseCase.execute(userMoke);
  });

  it('should be able to authenticate an user', async () => {
    const result = await createAuthenticateUseCase.execute({
      email: userMoke.email,
      password: userMoke.password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('userToken');
    expect(result).toHaveProperty('refresh_token');
  });

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await createAuthenticateUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      await createAuthenticateUseCase.execute({
        email: userMoke.email,
        password: 'passwordIncorrect',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

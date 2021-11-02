import { ICreateUserDTO } from '@modules/account/dto/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { CreateAuthenticateUseCase } from './CreateAuthenticateUseCase';

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createAuthenticateUseCase: CreateAuthenticateUseCase;
let createUserUseCase: CreateUserUseCase;
describe('Create Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createAuthenticateUseCase = new CreateAuthenticateUseCase(
      usersRepositoryInMemory
    );
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '002992',
      email: 'user@test.com',
      name: 'user test',
      password: '1234',
    };

    await createUserUseCase.execute({
      driver_license: user.driver_license,
      email: user.email,
      password: user.password,
      name: user.name,
    });

    const result = await createAuthenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
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
      const user: ICreateUserDTO = {
        driver_license: '002992',
        email: 'user@test.com',
        name: 'user test',
        password: '1234',
      };

      await createUserUseCase.execute({
        driver_license: user.driver_license,
        email: user.email,
        password: user.password,
        name: user.name,
      });

      const result = await createAuthenticateUseCase.execute({
        email: user.email,
        password: 'passwordIncorrect',
      });
      console.log(result);
    }).rejects.toBeInstanceOf(AppError);
  });
});

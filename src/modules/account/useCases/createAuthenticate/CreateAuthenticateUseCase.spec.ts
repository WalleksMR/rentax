import { ICreateUserDTO } from '../../dto/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
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
});

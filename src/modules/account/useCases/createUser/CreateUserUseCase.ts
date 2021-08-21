import { inject, injectable } from 'tsyringe';

import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IUsersRequest {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}
@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    username,
    password,
    email,
    driver_license,
  }: IUsersRequest): Promise<User> {
    const user = await this.usersRepository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };

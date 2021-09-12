import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '@errors/AppError';
import { User } from '@modules/account/entities/User';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

interface IUsersRequest {
  name: string;
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
    password,
    email,
    driver_license,
  }: IUsersRequest): Promise<User> {
    const userEmailExists = await this.usersRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError('Email already exists');
    }

    const passwordHash = await hash(password, 8);
    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };

import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/account/dto/ICreateUserDTO';
import { User } from '@modules/account/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    id,
    name,
    password,
    email,
    driver_license,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      id,
      name,
      password,
      email,
      driver_license,
      avatar,
    });

    await this.repository.save(user);
    const newUser = user;
    delete newUser.password;
    return newUser;
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);
    return user;
  }
}

export { UsersRepository };

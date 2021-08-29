import { getRepository, Repository } from 'typeorm';

import { User } from '../../entities/User';
import { IUsersRepository, IUsersRepositoryDTO } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    username,
    password,
    email,
    driver_license,
  }: IUsersRepositoryDTO): Promise<User> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license,
    });

    await this.repository.save(user);

    return user;
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

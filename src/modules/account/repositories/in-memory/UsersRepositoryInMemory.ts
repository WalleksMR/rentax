import { ICreateUserDTO } from '@modules/account/dto/ICreateUserDTO';
import { User } from '@modules/account/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      name,
      password,
      email,
      driver_license,
    });
    this.users.push(user);
    return user;
  }
  async list(): Promise<User[]> {
    const list = this.users;
    return list;
  }
  async findByEmail(email: string): Promise<User> {
    const userEmail = this.users.find((user) => user.email === email);
    return userEmail;
  }
  async findById(id: string): Promise<User> {
    const userID = this.users.find((user) => user.id === id);
    return userID;
  }
}

export { UsersRepositoryInMemory };

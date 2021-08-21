import { User } from '../entities/User';

interface IUsersRepositoryDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create({
    name,
    username,
    password,
    email,
    driver_license,
  }: IUsersRepositoryDTO): Promise<void>;
  list(): Promise<User[]>;
}

export { IUsersRepository, IUsersRepositoryDTO };

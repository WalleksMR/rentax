import { inject, injectable } from 'tsyringe';

import { User } from '@modules/account/entities/User';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';

@injectable()
class ListUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(): Promise<User[]> {
    const all = await this.usersRepository.list();
    return all;
  }
}

export { ListUserUseCase };

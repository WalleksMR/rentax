import { UseMapper } from '@modules/account/mapper/UserMapper';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<UseMapper> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User dows not exists');
    }

    return UseMapper.toDTO(user);
  }
}

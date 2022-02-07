import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/account/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ token, password }: IRequest): Promise<void> {
    const tokenExists = await this.usersTokenRepository.findByToken(token);
    if (!tokenExists) {
      throw new AppError('Token does not exists');
    }
    const expiresToken = this.dateProvider.dateIsBefore(
      tokenExists.expires_date,
      this.dateProvider.dateNow()
    );

    if (expiresToken) {
      throw new AppError('Token expired');
    }

    const user = await this.usersRepository.findById(tokenExists.user_id);
    const newPassword = await hash(password, 8);
    user.password = newPassword;

    await this.usersRepository.create(user);

    await this.usersTokenRepository.deleteById(tokenExists.id);
  }
}

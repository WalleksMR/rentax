import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import auth from '@config/auth';
import { IUsersTokenRepository } from '@modules/account/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IAuthenticateDTO {
  email: string;
  password: string;
}

type UserData = {
  name: string;
  email: string;
};

type IRequest = {
  userToken: UserData;
  token: string;
  refresh_token: string;
};
@injectable()
class CreateAuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({ email, password }: IAuthenticateDTO): Promise<IRequest> {
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    // Verify if exist user
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email or password incorrect');
    }
    // Verify if password is correct
    const passwordVerify = await compare(password, user.password);
    if (!passwordVerify) {
      throw new AppError('Email or password incorrect');
    }

    // Generate token
    const userToken: UserData = {
      name: user.name,
      email: user.email,
    };

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokenRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date,
    });

    return { token, userToken, refresh_token };
  }
}

export { CreateAuthenticateUseCase };

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/account/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import { resolve } from 'path';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}
  async execute(email: string): Promise<void> {
    const path = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'email',
      'forgotPassword.hbs'
    );
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = uuidV4();

    const expires_date = this.dateProvider.addHours(3);
    await this.usersTokenRepository.create({
      user_id: user.id,
      expires_date,
      refresh_token: token,
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };
    await this.mailProvider.sendMail({
      to: user.email,
      subject: 'Recuperação de senha',
      variables,
      path,
    });
  }
}

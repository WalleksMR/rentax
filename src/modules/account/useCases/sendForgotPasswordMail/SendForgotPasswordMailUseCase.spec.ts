import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersTokenRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

describe('Send Forgot Password', () => {
  let usersTokenRepository: UsersTokenRepositoryInMemory;
  let usersRepository: UsersRepositoryInMemory;
  let dateProvider: DayjsDateProvider;
  let mailProvider: MailProviderInMemory;
  let sendForgotPassword: SendForgotPasswordMailUseCase;

  const userMoke = {
    driver_license: '002992',
    email: 'user@test.com',
    name: 'user test',
    password: '12345',
  };
  beforeEach(() => {
    usersTokenRepository = new UsersTokenRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPassword = new SendForgotPasswordMailUseCase(
      usersTokenRepository,
      usersRepository,
      dateProvider,
      mailProvider
    );

    usersRepository.create(userMoke);
  });

  it('should be able send e-mail', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');
    await sendForgotPassword.execute(userMoke.email);

    expect(sendMail).toHaveBeenCalled();
  });
});

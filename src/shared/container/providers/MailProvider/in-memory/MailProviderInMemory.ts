import { IMailProvider, ISendMail } from '../IMailProvider';

export class MailProviderInMemory implements IMailProvider {
  mailProvider = [];
  async sendMail({ to, subject, variables, path }: ISendMail): Promise<void> {
    this.mailProvider.push(to, subject, variables, path);
  }
}

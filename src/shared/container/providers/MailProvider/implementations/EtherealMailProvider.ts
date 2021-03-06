import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';
import { IMailProvider, ISendMail } from '../IMailProvider';

export class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (error) {
      console.log(`EtherealMailProvider - Error: \n${error}`);
    }
  }

  async sendMail({ to, subject, variables, path }: ISendMail): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }
    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);

    const templateHtml = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreplay@rentx.com.br>',
      subject,
      html: templateHtml,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

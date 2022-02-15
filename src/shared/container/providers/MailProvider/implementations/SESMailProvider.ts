import nodemailer, { Transporter } from 'nodemailer';
import { SES } from 'aws-sdk';
import fs from 'fs';
import { injectable } from 'tsyringe';
import handlebars from 'handlebars';
import { IMailProvider, ISendMail } from '../IMailProvider';

@injectable()
export class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }
  async sendMail({ to, subject, variables, path }: ISendMail): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <walleks@mwup.com.br>',
      subject,
      html: templateHTML,
    });
  }
}

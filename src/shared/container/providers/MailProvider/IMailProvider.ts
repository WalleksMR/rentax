export interface ISendMail {
  to: string;
  subject: string;
  variables: any;
  path: string;
}
export interface IMailProvider {
  sendMail({ to, subject, variables, path }: ISendMail): Promise<void>;
}

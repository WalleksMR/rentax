import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '../../repositories/implementations/UsersRepository';

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
};
@injectable()
class CreateAuthenticateUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository
  ) {}
  async execute({ email, password }: IAuthenticateDTO): Promise<IRequest> {
    // Verify if exist user
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new Error('Email or password incorrect');
    }
    // Verify if password is correct
    const passwordVerify = await compare(password, user.password);
    if (!passwordVerify) {
      throw new Error('Email or password incorrect');
    }

    // Generate token
    const userToken: UserData = {
      name: user.name,
      email: user.email,
    };
    const token = sign({}, 'ignite', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { userToken, token };
  }
}

export { CreateAuthenticateUseCase };

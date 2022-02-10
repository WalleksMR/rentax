import { ICreateUserTokenDTO } from '@modules/account/dto/ICreateUserTokenDTO';
import { UserToken } from '@modules/account/infra/typeorm/entities/UserToken';
import { IUsersTokenRepository } from '../IUsersTokenRepository';

export class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
  usersToken: UserToken[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date,
    });
    this.usersToken.push(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.usersToken.find(
      (token) =>
        token.user_id === user_id && token.refresh_token === refresh_token
    );
  }
  async deleteById(id: string): Promise<void> {
    const newToken = this.usersToken;
    const tokenIndex = newToken.findIndex((token) => token.user_id === id);
    newToken.splice(tokenIndex, 1);
  }
  async findByToken(id: string): Promise<UserToken> {
    return this.usersToken.find((token) => token.id === id);
  }
}

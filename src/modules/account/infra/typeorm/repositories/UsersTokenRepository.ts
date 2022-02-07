import { ICreateUserTokenDTO } from '@modules/account/dto/ICreateUserTokenDTO';
import { IUsersTokenRepository } from '@modules/account/repositories/IUsersTokenRepository';
import { getRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

export class UsersTokenRepository implements IUsersTokenRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
  async findByToken(refresh_token: string): Promise<UserToken> {
    return this.repository.findOne({ refresh_token });
  }
}

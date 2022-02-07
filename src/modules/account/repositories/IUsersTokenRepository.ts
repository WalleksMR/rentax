import { ICreateUserTokenDTO } from '../dto/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;

  deleteById(id: string): Promise<void>;
  findByToken(tken: string): Promise<UserToken>;
}

import { ICreateUserTokenDTO } from '../dto/ICreateUserTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

export interface IUsersTokenRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken>;
}

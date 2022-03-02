import { IUserResponseDTO } from '../dto/IUserResponseDTO';
import { instanceToInstance } from 'class-transformer';
import { User } from '../infra/typeorm/entities/User';

export class UseMapper {
  static toDTO({
    id,
    name,
    email,
    driver_license,
    avatar,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      driver_license,
      avatar,
      avatar_url,
    });
    return user;
  }
}

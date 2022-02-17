import { ICreateUserDTO } from '../dto/ICreateUserDTO';

export class UseMapper {
  static toDTO({ id, name, email, driver_license, avatar }: ICreateUserDTO) {
    return { id, name, email, driver_license, avatar };
  }
}

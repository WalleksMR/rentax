import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification>;
}

export { ICreateSpecificationsDTO, ISpecificationsRepository };

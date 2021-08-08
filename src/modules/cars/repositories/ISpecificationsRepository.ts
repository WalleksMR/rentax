import { Specification } from '../model/Specification';

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationsDTO): Specification;
  findByName(name: string): Specification;
}

export { ICreateSpecificationsDTO, ISpecificationsRepository };

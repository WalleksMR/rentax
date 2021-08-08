import { Specification } from '../model/Specification';

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  list(): Specification[];
  findByName(name: string): Specification;
  create({ name, description }: ICreateSpecificationsDTO): Specification;
}

export { ICreateSpecificationsDTO, ISpecificationsRepository };

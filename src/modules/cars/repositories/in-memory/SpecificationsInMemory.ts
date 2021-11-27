import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async list(): Promise<Specification[]> {
    return this.specifications;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);

    return specification;
  }
  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );
    return specifications;
  }
}

export { SpecificationsInMemory };

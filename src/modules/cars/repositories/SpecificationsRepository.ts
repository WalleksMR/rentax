import { Specification } from '../model/Specification';
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specefications: Specification[];
  constructor() {
    this.specefications = [];
  }
  create({ name, description }: ICreateSpecificationsDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });
    this.specefications.push(specification);
    return specification;
  }

  findByName(name: string): Specification {
    const specification = this.specefications.find(
      (specification) => specification.name === name
    );
    return specification;
  }
}

export { SpecificationsRepository };

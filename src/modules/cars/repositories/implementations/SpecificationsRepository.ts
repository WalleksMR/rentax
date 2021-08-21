import { Specification } from '../../entities/Specification';
import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specefications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specefications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
  }

  create({ name, description }: ICreateSpecificationsDTO): Specification {
    const specification: Specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });
    this.specefications.push(specification);

    return specification;
  }

  list(): Specification[] {
    return this.specefications;
  }

  findByName(name: string): Specification {
    const specification = this.specefications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationsRepository };

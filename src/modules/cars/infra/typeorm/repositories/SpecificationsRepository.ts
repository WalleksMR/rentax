import { getRepository, Repository } from 'typeorm';

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async findById(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });
    await this.repository.save(specification);

    return specification;
  }

  async list(): Promise<Specification[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { SpecificationsRepository };

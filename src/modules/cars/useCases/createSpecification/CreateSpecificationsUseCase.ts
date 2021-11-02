import { inject, injectable } from 'tsyringe';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationsUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationRepository: ISpecificationsRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAreadyExisits =
      await this.specificationRepository.findByName(name);

    if (specificationAreadyExisits) {
      throw new AppError('Specification already exists');
    }

    const specification = await this.specificationRepository.create({
      name,
      description,
    });

    return specification;
  }
}
export { CreateSpecificationsUseCase };

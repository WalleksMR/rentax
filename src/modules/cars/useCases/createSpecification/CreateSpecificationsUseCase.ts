import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

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

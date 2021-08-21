import { Specification } from '../../entities/Specification';
import { ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class ListSpecificationsUseCase {
  private specificationsRepository: ISpecificationsRepository;

  constructor(specificationRepository: ISpecificationsRepository) {
    this.specificationsRepository = specificationRepository;
  }

  execute(): Specification[] {
    return this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };

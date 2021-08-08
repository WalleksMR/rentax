import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { CreateSpecificationCrontoller } from './CreateSpecificationsController';
import { CreateSpecificationsUseCase } from './CreateSpecificationsUseCase';

const specificationsRepository = SpecificationsRepository.getInstance();
const createSpecificationsUseCase = new CreateSpecificationsUseCase(
  specificationsRepository
);
const createSpecificationsController = new CreateSpecificationCrontoller(
  createSpecificationsUseCase
);

export { createSpecificationsController };

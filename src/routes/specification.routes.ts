import { Router } from 'express';

import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationsRepository';
import { CreateSpecificationsService } from '../modules/cars/services/CreateSpecificationsService';

const specificationRouter = Router();

const specificationRepository = new SpecificationsRepository();

specificationRouter.post('/', (request, response) => {
  try {
    const { name, description } = request.body;

    const specificationService = new CreateSpecificationsService(
      specificationRepository
    );
    const specification = specificationService.execute({ name, description });

    response.status(201).json(specification);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

export { specificationRouter };

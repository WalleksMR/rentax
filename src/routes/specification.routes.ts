import { Router } from 'express';

import { createSpecificationsController } from '../modules/cars/useCases/createSpecification';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

const specificationRouter = Router();

specificationRouter.get('/', (request, response) => {
  return listSpecificationsController.handle(request, response);
});

specificationRouter.post('/', (request, response) => {
  return createSpecificationsController.handle(request, response);
});

export { specificationRouter };

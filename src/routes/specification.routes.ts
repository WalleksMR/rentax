import { Router } from 'express';

import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecification/CreateSpecificationsController';
import { listSpecificationsController } from '../modules/cars/useCases/listSpecifications';

const specificationRouter = Router();

const createSpecificationsController = new CreateSpecificationsController();

specificationRouter.get('/', (request, response) => {
  return listSpecificationsController.handle(request, response);
});

specificationRouter.post('/', createSpecificationsController.handle);

export { specificationRouter };

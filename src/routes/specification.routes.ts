import { Router } from 'express';

import { CreateSpecificationsController } from '../modules/cars/useCases/createSpecification/CreateSpecificationsController';
import { ListSpecificationsController } from '../modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationRouter = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationRouter.get('/', listSpecificationsController.handle);

specificationRouter.post('/', createSpecificationsController.handle);

export { specificationRouter };

import { Router } from 'express';

import { CreateSpecificationsController } from '@modules/cars/useCases/createSpecification/CreateSpecificationsController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationRouter = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationRouter.post('/', createSpecificationsController.handle);

specificationRouter.use(ensureAuthenticated);
specificationRouter.get('/', listSpecificationsController.handle);

export { specificationRouter };

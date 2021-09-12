import { Router } from 'express';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { CreateSpecificationsController } from '@modules/cars/useCases/createSpecification/CreateSpecificationsController';
import { ListSpecificationsController } from '@modules/cars/useCases/listSpecifications/ListSpecificationsController';

const specificationRouter = Router();

const createSpecificationsController = new CreateSpecificationsController();
const listSpecificationsController = new ListSpecificationsController();

specificationRouter.post('/', createSpecificationsController.handle);

specificationRouter.use(ensureAuthenticated);
specificationRouter.get('/', listSpecificationsController.handle);

export { specificationRouter };

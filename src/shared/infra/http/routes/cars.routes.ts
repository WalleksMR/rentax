import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const createCarController = new CreateCarController();

const carRouter = Router();

carRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle
);

export { carRouter };

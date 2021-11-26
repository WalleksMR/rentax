import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const carRouter = Router();

carRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle
);

carRouter.get('/', listAvailableCarController.handle);

export { carRouter };

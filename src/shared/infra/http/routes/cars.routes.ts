import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';

const createCarController = new CreateCarController();

const carRouter = Router();

carRouter.post('/', createCarController.handle);

export { carRouter };

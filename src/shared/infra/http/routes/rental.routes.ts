import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalCrontoller';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ListRentalUseController } from '@modules/rentals/useCases/listRentalUser/ListRentalUserController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';

const rentalRoutes = Router();
const createRentalController = new CreateRentalController();
const listRentalUseController = new ListRentalUseController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalRoutes.get('/user', ensureAuthenticated, listRentalUseController.handle);
rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle
);

export { rentalRoutes };

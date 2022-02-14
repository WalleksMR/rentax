import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateSpecificationCarController } from '@modules/cars/useCases/createSpecificationCar/CreateSpecificationCarController';
import { ListAvailableCarController } from '@modules/cars/useCases/listAvailableCar/ListAvailableCarController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

const createCarController = new CreateCarController();
const listAvailableCarController = new ListAvailableCarController();
const createSpecificationCarController = new CreateSpecificationCarController();
const uploadCarImagesController = new UploadCarImagesController();
const carRouter = Router();
const uploadCars = multer(upload);

carRouter.post(
  '/',
  ensureAuthenticated,
  ensureIsAdmin,
  createCarController.handle
);
carRouter.post(
  '/images/:id',
  uploadCars.array('images'),
  uploadCarImagesController.handle
);
carRouter.post('/specifications/:id', createSpecificationCarController.handle);

carRouter.get('/', listAvailableCarController.handle);

export { carRouter };

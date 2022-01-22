import { Router } from 'express';
import multer from 'multer';

import createCategoryController from '@modules/cars/useCases/createCategory';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import listCategoriesController from '@modules/cars/useCases/listCategories';

const categoriesRouter = Router();
const upload = multer({ dest: './tmp' });
const importCategoryController = new ImportCategoryController();
categoriesRouter.post('/', (request, response) => {
  return createCategoryController().handle(request, response);
});

categoriesRouter.get('/', (request, response) => {
  return listCategoriesController().handle(request, response);
});

categoriesRouter.post(
  '/imports',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRouter };

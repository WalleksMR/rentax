import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRouter = Router();

const categoriesRepository = new CategoriesRepository();

categoriesRouter.post('/', (request, response) => {
  const { name, description } = request.body;

  try {
    const createCategoryService = new CreateCategoryService(
      categoriesRepository
    );
    const category = createCategoryService.execute({ name, description });
    response.status(201).json(category);
  } catch (e) {
    response.status(400).json({ error: e.message });
  }
});

categoriesRouter.get('/', (request, response) => {
  const all = categoriesRepository.list();
  response.json(all);
});

export { categoriesRouter };

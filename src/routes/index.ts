import { Router } from 'express';

import { categoriesRouter } from './categories.routes';
import { specificationRouter } from './specification.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationRouter);
routes.use('/users', usersRouter);

export { routes };

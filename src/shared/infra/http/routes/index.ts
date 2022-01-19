import { Router } from 'express';

import { carRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { sessionRouter } from './session.routes';
import { specificationRouter } from './specification.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationRouter);
routes.use('/users', usersRouter);
routes.use('/cars', carRouter);
routes.use('/sessions', sessionRouter);

export { routes };

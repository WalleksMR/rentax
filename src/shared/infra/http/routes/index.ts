import { Router } from 'express';

import { carRouter } from './cars.routes';
import { categoriesRouter } from './categories.routes';
import { passwordRouter } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { sessionRouter } from './session.routes';
import { specificationRouter } from './specification.routes';
import { usersRouter } from './users.routes';

const routes = Router();

routes.use('/sessions', sessionRouter);
routes.use('/users', usersRouter);
routes.use('/categories', categoriesRouter);
routes.use('/specifications', specificationRouter);
routes.use('/cars', carRouter);
routes.use('/rentals', rentalRoutes);
routes.use('/password', passwordRouter);

export { routes };

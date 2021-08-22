import { Router } from 'express';

import { CreateUserController } from '../modules/account/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/account/useCases/listUser/ListUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', listUserController.handle);

export { usersRouter };

import { Router } from 'express';
import multer from 'multer';

import upload from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/account/useCases/createUser/CreateUserController';
import { ListUserController } from '../modules/account/useCases/listUser/ListUserController';
import { UpdateUserAvatarController } from '../modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload.upload('./tmp/avatar'));

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', listUserController.handle);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRouter };

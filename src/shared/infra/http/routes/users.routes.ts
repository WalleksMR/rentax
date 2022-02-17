import { Router } from 'express';
import multer from 'multer';

import upload from '@config/upload';
import { CreateUserController } from '@modules/account/useCases/createUser/CreateUserController';
import { ListUserController } from '@modules/account/useCases/listUser/ListUserController';
import { UpdateUserAvatarController } from '@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ProfileUserController } from '@modules/account/useCases/profileUserUseCase/ProfileUserController';

const usersRouter = Router();

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const profileUserController = new ProfileUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadAvatar = multer(upload);

usersRouter.post('/', createUserController.handle);
usersRouter.get('/', listUserController.handle);
usersRouter.get('/profile', ensureAuthenticated, profileUserController.handle);
usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle
);

export { usersRouter };

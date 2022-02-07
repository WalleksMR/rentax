import { ResetPasswordUserController } from '@modules/account/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

export const passwordRouter = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);
passwordRouter.post('/reset', resetPasswordUserController.handle);

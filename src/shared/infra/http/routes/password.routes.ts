import { SendForgotPasswordMailController } from '@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

export const passwordRouter = Router();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRouter.post('/forgot', sendForgotPasswordMailController.handle);

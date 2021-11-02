import { Router } from 'express';

import { CreateAuthenticateController } from '@modules/account/useCases/createAuthenticate/CreateAuthenticateController';

const sessionRouter = Router();
const createAuthenticateController = new CreateAuthenticateController();
sessionRouter.post('/', createAuthenticateController.handle);

export { sessionRouter };

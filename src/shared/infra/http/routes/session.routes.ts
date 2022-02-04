import { Router } from 'express';

import { CreateAuthenticateController } from '@modules/account/useCases/createAuthenticate/CreateAuthenticateController';
import { RefreshTokenController } from '@modules/account/useCases/refreshToken/RefreshTokenController';

const sessionRouter = Router();
const createAuthenticateController = new CreateAuthenticateController();
const refreshTokenController = new RefreshTokenController();

sessionRouter.post('/', createAuthenticateController.handle);
sessionRouter.post('/refresh-token', refreshTokenController.handle);

export { sessionRouter };

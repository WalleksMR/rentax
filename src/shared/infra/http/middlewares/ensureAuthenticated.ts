import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import auth from '@config/auth';
import { UsersTokenRepository } from '@modules/account/infra/typeorm/repositories/UsersTokenRepository';

interface IPayload {
  sub: string;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const usersTokenRepository = new UsersTokenRepository();
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await usersTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );
    if (!user) {
      throw new AppError('User does not exists');
    }
    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid token!');
  }
}

import { AppError } from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const redisClient = createClient({
    legacyMode: true,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      sessionTimeout: 20,
    },
  });

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'rateLimiter',
    points: 15,
    duration: 10,
  });

  await redisClient.connect();
  try {
    await limiter.consume(request.ip);

    return next();
  } catch (error) {
    throw new AppError('Too many requests');
  }
}

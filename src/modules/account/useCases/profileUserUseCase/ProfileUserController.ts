import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserUseCase } from './ProfileUserUseCase';

export class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const profileUseUseCase = container.resolve(ProfileUserUseCase);
    const user = await profileUseUseCase.execute(id);

    return response.json(user);
  }
}

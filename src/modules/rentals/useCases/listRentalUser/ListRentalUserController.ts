import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListRentalUserUseCase } from './ListRentalUserUseCase';

class ListRentalUseController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listRentalUserUseCase = container.resolve(ListRentalUserUseCase);
    const listRental = await listRentalUserUseCase.execute(user_id);

    return response.status(200).json(listRental);
  }
}

export { ListRentalUseController };

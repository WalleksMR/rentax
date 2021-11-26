import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IListCarAvailable } from '@modules/cars/dto/IListCarAvailable';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

class ListAvailableCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, brand, category_id } = request.query;

    const listAvailableCarUseCase = container.resolve(ListAvailableCarUseCase);
    const cars = await listAvailableCarUseCase.execute({
      name,
      brand,
      category_id,
    } as IListCarAvailable);

    return response.json(cars);
  }
}

export { ListAvailableCarController };

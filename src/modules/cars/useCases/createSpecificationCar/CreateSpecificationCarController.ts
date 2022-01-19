import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationCarUseCase } from './CreateSpecificationCarUseCase';

class CreateSpecificationCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specification_id } = request.body;

    const createSpecificationCarUseCase = container.resolve(
      CreateSpecificationCarUseCase
    );
    const car = await createSpecificationCarUseCase.execute({
      car_id: id,
      specification_id,
    });

    return response.status(201).json(car);
  }
}

export { CreateSpecificationCarController };

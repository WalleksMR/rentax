import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationsUseCase } from './CreateSpecificationsUseCase';

class CreateSpecificationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { name, description } = request.body;

      const createSpecificationsUseCase = container.resolve(
        CreateSpecificationsUseCase
      );

      const specification = await createSpecificationsUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(specification);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationsController };

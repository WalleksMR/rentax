import { Request, Response } from 'express';

import { CreateSpecificationsUseCase } from './CreateSpecificationsUseCase';

class CreateSpecificationCrontoller {
  constructor(
    private createSpecificationsUseCase: CreateSpecificationsUseCase
  ) {}

  handle(request: Request, response: Response): Response {
    try {
      const { name, description } = request.body;

      const specification = this.createSpecificationsUseCase.execute({
        name,
        description,
      });

      return response.status(201).json(specification);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationCrontoller };

import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

class DevolutionRentalController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: rental_id } = request.params;
    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase);
    const devolution = await devolutionRentalUseCase.execute(rental_id);
    return response.status(200).json(devolution);
  }
}
export { DevolutionRentalController };

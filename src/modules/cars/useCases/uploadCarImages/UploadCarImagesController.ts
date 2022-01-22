import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';

import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
  path?: string;
}
class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImagesUseCase);
    const image_name = images.map((file) => file.filename);
    const paths = images.map((file) => file.path);

    const carimage = await uploadCarImagesUseCase.execute({
      car_id: id,
      image_name,
      paths,
    });

    return response.status(201).json(carimage);
  }
}

export { UploadCarImagesController };

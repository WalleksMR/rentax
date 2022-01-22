/* eslint-disable no-cond-assign */
/* eslint-disable prefer-destructuring */
// Implementar a remocao de arquivos com mesmo nome
// Permitir somente cadastrar 6 images por carro

import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  image_name: string[];
  paths?: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository
  ) {}

  async loadedImages({ car_id, image_name }: IRequest): Promise<CarImage[]> {
    const resultCars = [];

    const carsImages = image_name.map(async (image) => {
      const carImage = await this.carsImageRepository.create(car_id, image);
      return carImage;
    });
    for (let index = 0; carsImages.length > index; index += 1) {
      // eslint-disable-next-line no-await-in-loop
      const element = await carsImages[index];
      resultCars.push(element);
      console.log('finished');
    }

    return resultCars;
  }
  async execute({ car_id, image_name, paths }: IRequest): Promise<CarImage[]> {
    // Delete file of directory
    paths.map((path) => fs.promises.unlink(path));

    const limitCarByUser = await this.carsImageRepository.findByIdCar(car_id);
    if (limitCarByUser.length >= 10) {
      throw new AppError('Limit upload exceeded');
    }
    const carsImages = await this.loadedImages({ car_id, image_name });

    return carsImages;
  }
}

export { UploadCarImagesUseCase };

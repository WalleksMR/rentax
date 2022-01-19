import { inject, injectable } from 'tsyringe';

import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { ICarsImageRepository } from '@modules/cars/repositories/ICarsImageRepository';

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject('CarsImageRepository')
    private carsImageRepository: ICarsImageRepository
  ) {}

  async loadedImages({ car_id, image_name }: IRequest): Promise<CarImage[]> {
    const carsImages = image_name.map(async (image) => {
      const carImage = await this.carsImageRepository.create(car_id, image);
      return carImage;
    });
    const resultCars = [await carsImages[0], await carsImages[1]];

    return resultCars;
  }
  async execute({ car_id, image_name }: IRequest): Promise<CarImage[]> {
    const carsImages = await this.loadedImages({ car_id, image_name });
    return carsImages;
  }
}

export { UploadCarImagesUseCase };

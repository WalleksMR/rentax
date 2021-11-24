import { inject, injectable } from 'tsyringe';

import { IListCarAvailable } from '@modules/cars/dto/IListCarAvailable';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListAvailableCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    name,
    category_id,
  }: IListCarAvailable): Promise<Car[]> {
    const car = this.carsRepository.findByAvailable({
      name,
      brand,
      category_id,
    });

    return car;
  }
}

export { ListAvailableCarUseCase };

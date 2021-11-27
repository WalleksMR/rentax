import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  car_id: string;
  specification_id: string[];
}
class CreateSpecificationCar {
  constructor(
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({ car_id, specification_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);
    if (!carExists) throw new AppError('Car does not exists');

    const specification = await this.specificationsRepository.findById(
      specification_id
    );

    carExists.specifications = specification;

    await this.carsRepository.create(carExists);
    console.log(carExists);

    return carExists;
  }
}

export { CreateSpecificationCar };

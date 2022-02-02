import { inject, injectable } from 'tsyringe';

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const minimumHours = 24;
    const rentalOpenToCar = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    );
    // Verify if the car is available
    if (rentalOpenToCar) {
      throw new AppError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    );
    // Verify if exists another rental do by another user
    if (rentalOpenToUser) {
      throw new AppError('There is a rental in progress for user!');
    }

    const dateNow = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    // Verify if the rental is valid
    if (compare < minimumHours) {
      throw new AppError('invalid return time');
    }
    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }
}

export { CreateRentalUseCase };

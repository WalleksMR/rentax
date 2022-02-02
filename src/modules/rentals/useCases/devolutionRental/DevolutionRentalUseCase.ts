import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

export class DevolutionRentalUseCase {
  constructor(
    private carsRepository: ICarsRepository,
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider
  ) {}

  async execute(id: string): Promise<Rental> {
    const minimumDay = 1;
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) {
      throw new AppError('Rental does not exists');
    }
    const car = await this.carsRepository.findById(rental.car_id);

    // Verify the date of devolutionRental
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    // The rental should be charged the price of the a daily if return the car same day
    if (daily <= minimumDay) {
      daily = 1;
    }

    // let totalRental = car.daily_rate * daily;
    let totalRental = 0;

    // Fine amount by days delay
    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    // If exists delay, will calculate the fine amount
    if (delay > 0) {
      totalRental = delay * car.fine_amount;
    }
    totalRental += daily * car.daily_rate;

    rental.total = totalRental;
    rental.end_date = dateNow;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(rental.car_id, true);
    return rental;
  }
}

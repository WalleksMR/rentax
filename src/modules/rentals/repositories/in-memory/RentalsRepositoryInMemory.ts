import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    id,
    total,
    end_date,
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    if (id) {
      const rental = this.rentals.find((rental) => rental.id === id);

      Object.assign(rental, {
        total,
        end_date,
      });

      return rental;
    }

    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });
    this.rentals.push(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }
}

import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rentalOpenCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return rentalOpenCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rentalOpenUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return rentalOpenUser;
  }

  findById(id: string): Promise<Rental> {
    return this.repository.findOne({ id });
  }
}

export { RentalsRepository };

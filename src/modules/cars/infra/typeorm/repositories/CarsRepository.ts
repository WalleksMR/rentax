import { Repository, getRepository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';
import { IListCarAvailable } from '@modules/cars/dto/IListCarAvailable';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    daily_rate,
    fine_amount,
    license_plate,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }

  async findByAvailable({
    name,
    brand,
    category_id,
  }: IListCarAvailable): Promise<Car[]> {
    const carBuilder = this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (name) carBuilder.andWhere('c.name = :name', { name });
    if (brand) carBuilder.andWhere('c.brand = :brand', { brand });
    if (category_id)
      carBuilder.andWhere('c.category_id = :category_id', { category_id });
    const cars = await carBuilder.getMany();
    return cars;
  }
}
export { CarsRepository };

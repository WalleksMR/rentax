import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';
import { IListCarAvailable } from '@modules/cars/dto/IListCarAvailable';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    id,
    name,
    description,
    brand,
    daily_rate,
    fine_amount,
    license_plate,
    category_id,
    specifications,
  }: ICreateCarDTO): Promise<Car> {
    if (id) {
      const car = this.cars.find((c) => c.id === id);
      Object.assign(car, {
        id,
        name,
        description,
        brand,
        daily_rate,
        fine_amount,
        license_plate,
        category_id,
        specifications,
      });
      this.cars.push(car);

      return car;
    }

    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }
  async findByAvailable({
    name,
    brand,
    category_id,
  }: IListCarAvailable): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available === true);
    if (!name && !brand && !category_id) {
      return cars;
    }

    cars = cars.filter((car) => {
      if (car.brand === brand) return true;
      if (car.name === name) return true;
      if (car.category_id === category_id) return true;

      return false;
    });
    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(car_id: string, available: boolean): Promise<void> {
    const findCarIndex = this.cars.findIndex((car) => car.id === car_id);
    this.cars[findCarIndex].available = available;
  }
}

export { CarsRepositoryInMemory };

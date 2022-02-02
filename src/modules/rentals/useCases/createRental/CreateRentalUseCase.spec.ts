import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';

describe('Create Rental', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let dayJsDateProvider: DayjsDateProvider;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  const Hours24After = dayjs().add(1, 'day').toDate();

  let car: Car;
  let category: Category;

  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    );

    category = await categoriesRepositoryInMemory.create({
      name: 'SUV',
      description: 'Top SUV',
    });

    car = await carsRepositoryInMemory.create({
      name: 'Car 01',
      description: 'Car 01 description',
      brand: 'Brand Car 01',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCCD',
      category_id: category.id,
    });
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '999',
      car_id: car.id,
      expected_return_date: Hours24After,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
    expect(car.available).toBe(false);
  });

  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '999',
        car_id: car.id,
        expected_return_date: Hours24After,
      });
      await createRentalUseCase.execute({
        user_id: '999',
        car_id: car.id,
        expected_return_date: Hours24After,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '222',
        car_id: car.id,
        expected_return_date: Hours24After,
      });
      await createRentalUseCase.execute({
        user_id: '999',
        car_id: car.id,
        expected_return_date: Hours24After,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '222',
        car_id: car.id,
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

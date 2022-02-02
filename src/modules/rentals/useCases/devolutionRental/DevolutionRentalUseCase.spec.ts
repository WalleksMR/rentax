import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import dayjs from 'dayjs';
import { DevolutionRentalUseCase } from './DevolutionRentalUseCase';

describe('Devolution Rental Use Case', () => {
  let devolutionRentalUseCase: DevolutionRentalUseCase;
  let dayjsDateProvider: DayjsDateProvider;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  let carsRepositoryinMemory: CarsRepositoryInMemory;
  let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

  let category: Category;
  let car: Car;

  const Hours24After = dayjs().add(1, 'day').toDate();

  beforeEach(async () => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    carsRepositoryinMemory = new CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    devolutionRentalUseCase = new DevolutionRentalUseCase(
      carsRepositoryinMemory,
      rentalsRepositoryInMemory,
      dayjsDateProvider
    );

    category = await categoriesRepositoryInMemory.create({
      name: 'SUV',
      description: 'Top SUV',
    });

    car = await carsRepositoryinMemory.create({
      name: 'Car 05 available',
      description: 'Car 05 description',
      brand: 'Brand Car 05',
      daily_rate: 220,
      fine_amount: 50,
      license_plate: 'ABB-CCCAD',
      category_id: category.id,
    });
  });

  it('should be able to do devolution of the rental car with price of daily', async () => {
    const rental = await rentalsRepositoryInMemory.create({
      user_id: '999',
      car_id: car.id,
      expected_return_date: Hours24After,
    });
    car.available = false;

    const devolution = await devolutionRentalUseCase.execute(rental.id);

    expect(devolution.total).not.toBe(null);
    expect(devolution.end_date).not.toBe(null);
    expect(devolution.total).toBe(220);
  });

  it('should be able calculate the rental with delay', async () => {
    const rental = await rentalsRepositoryInMemory.create({
      user_id: '999',
      car_id: car.id,
      expected_return_date: dayjs().subtract(1, 'month').toDate(),
    });
    rental.start_date = dayjs().subtract(2, 'month').toDate();
    car.available = false;

    const devolution = await devolutionRentalUseCase.execute(rental.id);

    const daley = dayjsDateProvider.compareInDays(
      rental.expected_return_date,
      dayjsDateProvider.dateNow()
    );
    const daily = dayjsDateProvider.compareInDays(
      rental.start_date,
      dayjsDateProvider.dateNow()
    );

    const total = daily * car.daily_rate + daley * car.fine_amount;

    expect(devolution.total).not.toBe(null);
    expect(devolution.end_date).not.toBe(null);
    expect(devolution.total).toBe(total);
  });
});

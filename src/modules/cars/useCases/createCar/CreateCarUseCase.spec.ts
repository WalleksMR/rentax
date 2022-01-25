import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateRepositoryInMemory } from '@modules/cars/repositories/in-memory/CreateRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

describe('Create Car', () => {
  let createCarUseCase: CreateCarUseCase;
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let categoryInMemory: CreateRepositoryInMemory;
  let category: Category;

  beforeEach(async () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    categoryInMemory = new CreateRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(
      carsRepositoryInMemory,
      categoryInMemory
    );

    category = await categoryInMemory.create({
      name: 'SUV',
      description: 'Top SUV',
    });
  });

  it('should be able create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Car 01',
      description: 'Car 01 description',
      brand: 'Brand Car 01',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCCD',
      category_id: category.id,
    });
  });

  it('should not be able create a new car without a category valid', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 01',
        description: 'Car 01 description',
        brand: 'Brand Car 01',
        daily_rate: 122,
        fine_amount: 11111,
        license_plate: 'ABB-CCCD',
        category_id: 'Category-Invalid',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able create a new car with the same license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 02',
        description: 'Car 02 description',
        brand: 'Brand Car 02',
        daily_rate: 122,
        fine_amount: 11111,
        license_plate: 'ABB-CCC',
        category_id: category.id,
      });

      await createCarUseCase.execute({
        name: 'Car 03',
        description: 'Car 03 description',
        brand: 'Brand Car 03',
        daily_rate: 122,
        fine_amount: 11111,
        license_plate: 'ABB-CCC',
        category_id: category.id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default value', async () => {
    const car = await createCarUseCase.execute({
      name: 'Car 05 available',
      description: 'Car 05 description',
      brand: 'Brand Car 05',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCCAD',
      category_id: category.id,
    });

    expect(car.available).toEqual(true);
  });
});

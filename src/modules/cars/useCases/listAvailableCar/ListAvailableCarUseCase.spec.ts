import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarUseCase } from './ListAvailableCarUseCase';

describe('List Car', () => {
  let carsRepositoryInMemory: CarsRepositoryInMemory;
  let listAvailableCarsUseCase: ListAvailableCarUseCase;

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarUseCase(
      carsRepositoryInMemory
    );
  });

  it('Should be able list all cars with available value true', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car 01',
      description: 'Car 01 description',
      brand: 'Brand Car 01',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCCDF',
      category_id: 'asdasd-asdasdk-asdasd',
    });

    await carsRepositoryInMemory.create({
      name: 'Car 02',
      description: 'Car 02 description',
      brand: 'Brand Car 02',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCCD',
      category_id: 'asdasd-asdasdk-asdasd',
    });

    const all = await listAvailableCarsUseCase.execute({});

    expect(all).toEqual(all);
  });

  it('Should be able list all cars with available value true and by name', async () => {
    await carsRepositoryInMemory.create({
      name: 'Car 03',
      description: 'Car 03 description',
      brand: 'Brand Car 03',
      daily_rate: 1222,
      fine_amount: 11111,
      license_plate: 'ABB-CCCDDF',
      category_id: 'asdasd-asdasdk-asdasd',
    });

    const carName = await carsRepositoryInMemory.create({
      name: 'Car 04',
      description: 'Car 04 description',
      brand: 'Brand Car 04',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCFFCD',
      category_id: 'asdasd-asdasdk-asdasd',
    });

    const listByName = await listAvailableCarsUseCase.execute({
      name: 'Car 04',
    });

    expect(listByName).toEqual([carName]);
  });
});

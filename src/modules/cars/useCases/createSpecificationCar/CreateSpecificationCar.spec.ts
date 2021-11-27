import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsInMemory } from '@modules/cars/repositories/in-memory/SpecificationsInMemory';

import { CreateSpecificationCar } from './CreateSpecificationCar';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createSpecificationCar: CreateSpecificationCar;
let specificationsInMemory: SpecificationsInMemory;

describe('Create specification car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsInMemory = new SpecificationsInMemory();
    createSpecificationCar = new CreateSpecificationCar(
      carsRepositoryInMemory,
      specificationsInMemory
    );
  });

  it('should be able add a new specification car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car 05 available',
      description: 'Car 05 description',
      brand: 'Brand Car 05',
      daily_rate: 122,
      fine_amount: 11111,
      license_plate: 'ABB-CCCAD',
      category_id: 'asdasd-asdasdk-asdasd',
    });

    const specification = await specificationsInMemory.create({
      name: 'Carro 05 postas',
      description: 'Has all the ports',
    });

    const specificationCar = await createSpecificationCar.execute({
      car_id: car.id,
      specification_id: [specification.id],
    });
    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications).toHaveLength(1);
  });
});

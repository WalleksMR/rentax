import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsInMemory } from '@modules/cars/repositories/in-memory/SpecificationsInMemory';

import { CreateSpecificationCarUseCase } from './CreateSpecificationCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createSpecificationCarUseCase: CreateSpecificationCarUseCase;
let specificationsInMemory: SpecificationsInMemory;

const mockCar = {
  name: 'Car 05 available',
  description: 'Car 05 description',
  brand: 'Brand Car 05',
  daily_rate: 122,
  fine_amount: 11111,
  license_plate: 'ABB-CCCAD',
  category_id: 'asdasd-asdasdk-asdasd',
};

describe('Create specification car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsInMemory = new SpecificationsInMemory();
    createSpecificationCarUseCase = new CreateSpecificationCarUseCase(
      carsRepositoryInMemory,
      specificationsInMemory
    );
  });

  it('should be able add a new specification car', async () => {
    const car = await carsRepositoryInMemory.create(mockCar);

    const specification = await specificationsInMemory.create({
      name: 'Carro 05 postas',
      description: 'Has all the ports',
    });

    const specificationCar = await createSpecificationCarUseCase.execute({
      car_id: car.id,
      specification_id: [specification.id],
    });

    expect(specificationCar).toHaveProperty('specifications');
    expect(specificationCar.specifications).toHaveLength(1);
  });
});

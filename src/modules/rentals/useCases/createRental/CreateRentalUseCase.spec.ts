import dayjs from 'dayjs';

import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

describe('Create Rental', () => {
  let createRentalUseCase: CreateRentalUseCase;
  let dayJsDateProvider: DayjsDateProvider;
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  const Hours24After = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    );
  });
  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '999',
      car_id: '344',
      expected_return_date: Hours24After,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '999',
        car_id: '344',
        expected_return_date: Hours24After,
      });
      await createRentalUseCase.execute({
        user_id: '999',
        car_id: '344',
        expected_return_date: Hours24After,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '222',
        car_id: '344',
        expected_return_date: Hours24After,
      });
      await createRentalUseCase.execute({
        user_id: '999',
        car_id: '344',
        expected_return_date: Hours24After,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '222',
        car_id: '344',
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

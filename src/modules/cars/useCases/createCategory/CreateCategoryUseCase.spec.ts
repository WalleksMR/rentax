import { CreateRepositoryInMemory } from '../../repositories/in-memory/CreateRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let createRepositoryInMemory: CreateRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    createRepositoryInMemory = new CreateRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(createRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const categoryInput = {
      name: 'Category test',
      description: 'Description category test',
    };

    const category = await createCategoryUseCase.execute({
      name: categoryInput.name,
      description: categoryInput.description,
    });

    expect(category).toHaveProperty('id');
  });
});

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  async execute({ name, description }: IRequest): Promise<void> {
    const categoryalreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryalreadyExists) {
      throw new Error('Category already exists');
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };

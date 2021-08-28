import { AppError } from '../../../../errors/AppError';
import { Category } from '../../entities/Category';
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
  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryalreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryalreadyExists) {
      throw new AppError('Category already exists');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoryUseCase };

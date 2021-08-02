import { Category } from '../models/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: ICategoriesRepository;
  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  execute({ name, description }: IRequest): Category {
    const categoryalreadyExists = this.categoriesRepository.findByName(name);

    if (categoryalreadyExists) {
      throw new Error('Category already exists');
    }

    const category = this.categoriesRepository.create({ name, description });
    return category;
  }
}

export { CreateCategoryService };

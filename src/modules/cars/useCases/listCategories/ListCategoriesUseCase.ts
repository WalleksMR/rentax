import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };

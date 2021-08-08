import { Category } from '../../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];
  private static INSTACE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTACE) {
      CategoriesRepository.INSTACE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTACE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category: Category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
    console.log(this.categories);

    return category;
  }

  list(): Category[] {
    console.log(this.categories);
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepository };

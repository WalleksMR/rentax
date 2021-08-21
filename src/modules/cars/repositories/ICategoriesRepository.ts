import { Category } from '../entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };

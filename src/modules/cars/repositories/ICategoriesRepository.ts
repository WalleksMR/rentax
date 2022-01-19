import { Category } from '@modules/cars/infra/typeorm/entities/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findById(id: string): Promise<Category>;
}

export { ICategoriesRepository, ICreateCategoryDTO };

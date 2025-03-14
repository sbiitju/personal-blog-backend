import { ICategory } from './category.interface';
import { Category } from './category.model';

export const createCategory = async (categoryData: ICategory) => {
  const category = await Category.create(categoryData);
  return category;
};

export const CatgoryServices = {
  createCategory,
};

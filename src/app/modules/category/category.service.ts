import { ICategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (categoryData: ICategory) => {
  const category = await Category.create(categoryData);
  return category;
};

const getAllCategories = async () => {
  return Category.find().populate('subcategories');
};

export const CatgoryServices = {
  createCategory,
  getAllCategories,
};

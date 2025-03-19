import { Subcategory } from '../sub-category/sub-category.model';
import { ICategory, ISubcategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (categoryData: ICategory) => {
  const category = await Category.create(categoryData);
  return category;
};

const getAllCategoriesByRole = async (role: string) => {
  return Category.find({ role: role }).populate('subcategories');
};

const getAllCategory = async () => {
  const result = await Category.find();
  return result;
};

const createSubCategory = async (subCategoryData: ISubcategory) => {
  const subCategory = await Subcategory.create(subCategoryData);

  await Category.findByIdAndUpdate(subCategory.parentCategory, {
    $push: { subcategories: subCategory._id },
  });

  return subCategory;
};

const getAllSubCategories = async () => {
  const result = await Subcategory.find();
  return result;
};

const deleteCategory = async (id: string) => {
  const result = await Category.findByIdAndDelete(id);
  return result;
};

export const CatgoryServices = {
  createCategory,
  getAllCategoriesByRole,
  createSubCategory,
  getAllSubCategories,
  deleteCategory,
  getAllCategory,
};

import { Subcategory } from '../sub-category/sub-category.model';
import { ICategory, ISubcategory } from './category.interface';
import { Category } from './category.model';

const createCategory = async (categoryData: ICategory) => {
  const category = await Category.create(categoryData);
  return category;
};

const getAllCategories = async () => {
  return Category.find().populate('subcategories');
};

const createSubCategory = async (subCategoryData: ISubcategory) => {
  const subCategory = await Subcategory.create(subCategoryData);

  await Category.findByIdAndUpdate(subCategory.parentCategory, {
    $push: { subcategories: subCategory._id },
  });

  return subCategory;
};

export const CatgoryServices = {
  createCategory,
  getAllCategories,
  createSubCategory,
};

import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { categoryValidation } from './category.validtion';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post(
  '/create-category',
  validateRequest(categoryValidation.createCategorySchema),
  CategoryController.createCategory,
);
router.post(
  '/create-sub-category',
  validateRequest(categoryValidation.createSubcategorySchema),
  CategoryController.createSubCategory,
);

router.get('/categories/:role', CategoryController.getAllCategories);

router.get('/sub-categories', CategoryController.getAllSubCategories);

export const CategoryRoutes = router;

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { CatgoryServices } from './category.service';
import { get } from 'mongoose';
import { Subcategory } from '../sub-category/sub-category.model';

const createCategory = catchAsync(async (req, res) => {
  const category = req.body;
  const result = await CatgoryServices.createCategory(category);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CatgoryServices.getAllCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories fetched successfully',
    data: result,
  });
});

const createSubCategory = catchAsync(async (req, res) => {
  const subCategory = req.body;
  const result = await CatgoryServices.createSubCategory(subCategory);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category created successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  createSubCategory,
};

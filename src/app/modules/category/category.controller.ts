import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { CatgoryServices } from './category.service';

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
  const { role } = req.params;
  const result = await CatgoryServices.getAllCategories(role);
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

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await CatgoryServices.getAllSubCategories();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'SubCategories fetched successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CatgoryServices.deleteCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  createSubCategory,
  getAllSubCategories,
  deleteCategory,
};

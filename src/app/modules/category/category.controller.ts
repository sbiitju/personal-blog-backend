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

export const CategoryController = {
  createCategory,
};

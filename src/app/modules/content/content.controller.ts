import httpStatus from 'http-status';
import { TImageFile } from '../../interface/image.interface';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { ContentService } from './content.service';
import AppError from '../../errors/AppError';
import { get } from 'http';

const creaateContent = catchAsync(async (req, res) => {
  const file = req.file as TImageFile;
  const payload = req.body;
  if (file) {
    payload.photo = file.path;
  } else {
    new AppError(httpStatus.BAD_REQUEST, 'Please provide a photo');
  }
  const result = await ContentService.creeateContentIntoDb(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content created successfully',
    data: result,
  });
});

const updateContent = catchAsync(async (req, res) => {
  const file = req?.file as TImageFile;
  const { id } = req.params;
  const payload = req.body;
  if (file) {
    payload.photo = file.path;
  }
  const result = await ContentService.updateContentIntoDb(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content updated successfully',
    data: result,
  });
});

const getAllContent = catchAsync(async (req, res) => {
  const result = await ContentService.getAllContentFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContentByDomain = catchAsync(async (req, res) => {
  const { domain } = req.params;
  const result = await ContentService.getContentByDomain(domain);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContentByCategoryAndDomain = catchAsync(async (req, res) => {
  const { category, domain } = req.params;
  const result = await ContentService.getContentByCategoryAndDomain(
    category,
    domain,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});
const getContentByCategory = catchAsync(async (req, res) => {
  const { category } = req.params;
  const result = await ContentService.getContentByCategory(category);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContentBySubcategoryAndDomain = catchAsync(async (req, res) => {
  const { subcategory, domain } = req.params;
  const result = await ContentService.getContentBySubcategoryAndDomain(
    subcategory,
    domain,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});
const getContentBySubcategory = catchAsync(async (req, res) => {
  const { subcategory } = req.params;
  const result = await ContentService.getContentBySubcategory(subcategory);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});

const getContentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContentService.getContentById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content fetched successfully',
    data: result,
  });
});

const deleteContentById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ContentService.deleteContentById(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Content deleted successfully',
    data: result,
  });
});

export const ContentController = {
  creaateContent,
  getAllContent,
  getContentByDomain,
  getContentByCategory,
  getContentBySubcategory,
  getContentById,
  updateContent,
  deleteContentById,
  getContentByCategoryAndDomain,
  getContentBySubcategoryAndDomain,
};

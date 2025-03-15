import httpStatus from 'http-status';
import { TImageFile } from '../../interface/image.interface';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { ContentService } from './content.service';
import AppError from '../../errors/AppError';

const creaateContent = catchAsync(async (req, res) => {
  const file = req?.file as TImageFile;
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

export const ContentController = {
  creaateContent,
  getAllContent,
  getContentByDomain,
};

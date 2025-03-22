import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { BannerServices } from './banner.service';
import { TImageFile } from '../../interface/image.interface';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';

const createBanner = catchAsync(async (req, res) => {
  const file = req?.file;
  if (!file) {
    new AppError(httpStatus.BAD_REQUEST, 'Please provide a photo');
  }
  const user = req?.user as JwtPayload;
  const domain = user?.domain;
  const result = await BannerServices.createBannerIntoDb(
    file as TImageFile,
    domain,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner created successfully',
    data: result,
  });
});

const getAllBanner = catchAsync(async (req, res) => {
  const domain = req?.params?.domain;
  const result = await BannerServices.getAllBanner(domain);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner fetched successfully',
    data: result,
  });
});

const deleteBanner = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BannerServices.deleteBanner(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner deleted successfully',
    data: result,
  });
});

export const BannerController = {
  createBanner,
  deleteBanner,
  getAllBanner,
};

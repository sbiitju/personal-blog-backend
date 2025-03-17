import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { BannerServices } from './banner.service';
import { TImageFile } from '../../interface/image.interface';
import { JwtPayload } from 'jsonwebtoken';

const createBanner = catchAsync(async (req, res) => {
  const file = req?.file;
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

export const BannerController = {
  createBanner,
};

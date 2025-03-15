import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { BiographService } from './biograph.service';

const createBiograph = catchAsync(async (req, res) => {
  const biograph = req.body;
  const result = await BiographService.createBiographIntoDb(biograph);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bio created successfully',
    data: result,
  });
});

const getBiograph = catchAsync(async (req, res) => {
  const { domain } = req.params;
  const result = await BiographService.getBiographFromDb(domain);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bio fetched successfully',
    data: result,
  });
});

export const BiographController = {
  createBiograph,
  getBiograph,
};

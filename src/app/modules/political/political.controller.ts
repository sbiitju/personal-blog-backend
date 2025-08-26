import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { PoliticalServices } from './political.service';
import { TImageFile } from '../../interface/image.interface';

const getLoggedPoliticalUser = catchAsync(async (req, res) => {
  const user = req?.user as JwtPayload;
  const result = await PoliticalServices.getLoggedPoliticalUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Political user retrieved successfully',
    data: result,
  });
});

const updatePoliticalProfile = catchAsync(async (req, res) => {
  const user = req?.user as JwtPayload;
  const file = req?.file as TImageFile;
  const { ...updateData } = req.body;

  // Handle profile picture upload
  if (file) {
    updateData.profilePicture = file.path;
  }

  const result = await PoliticalServices.updatePoliticalProfile(user, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Political profile updated successfully',
    data: result,
  });
});

const getPoliticalByDomain = catchAsync(async (req, res) => {
  const { domain } = req.params;
  const result = await PoliticalServices.getPoliticalByDomain(domain);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Political user retrieved successfully',
    data: result,
  });
});

const getAllPoliticalUsers = catchAsync(async (req, res) => {
  const result = await PoliticalServices.getAllPoliticalUsers();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All political users retrieved successfully',
    data: result,
  });
});

const deletePoliticalUser = catchAsync(async (req, res) => {
  const user = req?.user as JwtPayload;
  const result = await PoliticalServices.deletePoliticalUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Political user deleted successfully',
    data: result,
  });
});

export const PoliticalController = {
  getLoggedPoliticalUser,
  updatePoliticalProfile,
  getPoliticalByDomain,
  getAllPoliticalUsers,
  deletePoliticalUser,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import { TImageFile } from '../../interface/image.interface';

const createClientAccount = catchAsync(async (req, res) => {
  const file = req?.file as TImageFile;

  const { client: clientData, password, role } = req.body;

  if (file) {
    clientData.profilePicture = file.path;
  }
  // will call services func to send this data
  const result = await UserServices.createClientAccountIntoDb(
    password,
    role,
    clientData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client Account created successfully',
    data: result,
  });
});

export const UserController = {
  createClientAccount,
};

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createClientAccount = catchAsync(async (req, res) => {
  const { political: clientData, password, role } = req.body;
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

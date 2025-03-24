import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result,
  });
});

const deleteUserByUserID = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteUserByUserId(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllUsers,
  deleteUserByUserID,
};

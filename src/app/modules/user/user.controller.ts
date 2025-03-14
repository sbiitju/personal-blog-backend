import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createPoliticalAccount = catchAsync(async (req, res) => {
  const { political: politicalData, password } = req.body;
  // will call services func to send this data
  const result = await UserServices.createPoliticalAccountIntoDb(
    password,
    politicalData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Political Account created successfully',
    data: result,
  });
});

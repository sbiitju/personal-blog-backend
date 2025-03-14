import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsynch';
import sendResponse from '../../utils/sendResponse';
import { ClientServices } from './political.service';

const getClientInfo = catchAsync(async (req, res) => {
  const result = await ClientServices.getClieintInfo(req.params.domain);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Client Info fetched successfully',
    data: result,
  });
});

export const ClientController = {
  getClientInfo,
};

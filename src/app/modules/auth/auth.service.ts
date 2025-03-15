import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import { Political } from '../political/political.model';
import { Types } from 'mongoose';

const loginUser = async (payload: ILoginUser) => {
  const user: any = await User.isUserExistsByEmail(payload?.email);

  const currenUser = await Political.findOne({
    email: payload?.email,
  });

  // if user not found
  if (!user && !currenUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  if (user.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is deleted');
  }
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is block');
  }

  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Incorrect password');
  }

  const jwtPayload = {
    id: user?._id,
    email: user?.email,
    role: user?.role,
    name: currenUser?.name || '',
    domain: currenUser?.domain || '',
    profilePicture: currenUser?.profilePicture || '',
  };

  if (!jwtPayload.id) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User ID is missing');
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refrsh_expire_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
};

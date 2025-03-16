import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import config from '../../config';
import { createToken } from './auth.utils';
import { Political } from '../political/political.model';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const loginUser = async (payload: ILoginUser) => {
  const user: any = await User.isUserExistsByEmail(payload?.email);
  console.log(payload);
  console.log(user);
  const currenUser = await Political.findOne({
    email: payload?.email,
  });

  // if user not found
  if (!user && !currenUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is deleted');
  }
  if (user?.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This user is block');
  }

  if (!(await User.isUserPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Incorrect password');
  }
  console.log(user?.password);

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

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData?.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.isBlocked;

  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isUserPasswordMatch(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password does not matched');
  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData?.email,
      role: userData?.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );

  return null;
};

export const AuthServices = {
  loginUser,
  changePassword,
};

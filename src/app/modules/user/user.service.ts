import mongoose from 'mongoose';
import config from '../../config';
import { IPolitical } from '../political/political.interface';
import { IUser, TUserRole } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Political } from '../political/political.model';

const createClientAccountIntoDb = async (
  password: string,
  role: TUserRole,
  payload: IPolitical,
) => {
  const userData: Partial<IUser> = {};

  // set password
  userData.password = password || (config.default_password as string);
  // set role
  userData.role = role || 'political';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // creeate user
    const newUser = await User.create([userData], { session });

    // create political
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create users');
    }

    payload.user = newUser[0]._id;

    // create political transaction
    const newPolitical = await Political.create([payload], { session });
    if (!newPolitical.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Faild to create political');
    }

    await session.commitTransaction();
    await session.endSession();

    return newPolitical;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

export const UserServices = {
  createClientAccountIntoDb,
};

import mongoose from 'mongoose';
import config from '../../config';
import { IPolitical } from '../political/political.interface';
import { IUser, TUserRole } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Political } from '../political/political.model';
import { IAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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

const createAdminAccountIntoDb = async (password: string, payload: IAdmin) => {
  const userData: Partial<IUser> = {};

  // set password
  userData.password = password || (config.default_password as string);
  // set role
  userData.role = 'admin';

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // Create user (admin user)
    const newUser = await User.create([userData], { session });

    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    payload.user = newUser[0]._id; // Link the newly created user to the admin entity

    // Create admin transaction
    const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin; // Return the newly created admin
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  }
};

export const UserServices = {
  createClientAccountIntoDb,
  createAdminAccountIntoDb,
};

import mongoose from 'mongoose';
import { Political } from '../political/political.model';
import { Admin } from './admin.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const getAllUsers = async () => {
  const [politicalUsers, adminUsers] = await Promise.all([
    Political.find().populate({ path: 'user', select: '-password' }),
    Admin.find().populate({ path: 'user', select: '-password' }),
  ]);

  const allUsers = [...politicalUsers, ...adminUsers];
  return allUsers;
};

const deleteUserByUserId = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

export const AdminServices = {
  getAllUsers,
  deleteUserByUserId,
};

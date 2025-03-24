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

const toggleUserDeletionStatus = async (id: string) => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    { isDeleted: !user.isDeleted }, // Toggle the value
    { new: true },
  );

  return updatedUser;
};

export const AdminServices = {
  getAllUsers,
  toggleUserDeletionStatus,
};

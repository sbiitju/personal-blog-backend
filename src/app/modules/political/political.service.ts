import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { IPolitical } from './political.interface';
import { Political } from './political.model';

const getLoggedPoliticalUser = async (user: JwtPayload) => {
  const result = await Political.findOne({ user: user.id }).populate('user');
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Political user not found');
  }

  return result;
};

const updatePoliticalProfile = async (
  user: JwtPayload,
  payload: Partial<IPolitical>
) => {
  const result = await Political.findOneAndUpdate(
    { user: user.id },
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).populate('user');

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Political user not found');
  }

  return result;
};

const getPoliticalByDomain = async (domain: string) => {
  const result = await Political.findOne({ domain }).populate('user');
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Political user not found with this domain');
  }

  return result;
};

const getAllPoliticalUsers = async () => {
  const result = await Political.find({}).populate('user');
  return result;
};

const deletePoliticalUser = async (user: JwtPayload) => {
  const result = await Political.findOneAndDelete({ user: user.id });
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Political user not found');
  }

  return result;
};

export const PoliticalServices = {
  getLoggedPoliticalUser,
  updatePoliticalProfile,
  getPoliticalByDomain,
  getAllPoliticalUsers,
  deletePoliticalUser,
};

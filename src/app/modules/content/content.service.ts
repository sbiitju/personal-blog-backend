import mongoose from 'mongoose';
import { Content } from './content.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IContent } from './content.interface';
import { Political } from '../political/political.model';

const creeateContentIntoDb = async (content: IContent) => {
  const domain = content.domain;
  const user = await Political.findOne({ domain });
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User not found with this domain',
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const newContent = await Content.create([content], { session });

    if (!newContent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create content');
    }

    await session.commitTransaction();
    await session.endSession();

    return newContent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err);
  }
};

const updateContentIntoDb = async (id: string, content: IContent) => {
  const domain = content.domain;
  const user = await Political.findOne({ domain });

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User not found with this domain',
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updatedContent = await Content.findByIdAndUpdate(id, content, {
      new: true,
      session,
    });

    if (!updatedContent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update content');
    }

    await session.commitTransaction();
    return updatedContent;
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
  } finally {
    await session.endSession();
  }
};

const getAllContentFromDb = async () => {
  const result = await Content.find();
  return result;
};

const getContentByDomain = async (domain: string) => {
  const result = await Content.find({ domain });
  return result;
};

const getContentByCategory = async (category: string) => {
  const result = await Content.find({ category });
  return result;
};

const getContentBySubcategory = async (subcategory: string) => {
  const result = await Content.find({ subcategory });
  return result;
};

const getContentById = async (id: string) => {
  const result = await Content.findById(id);
  return result;
};

export const ContentService = {
  creeateContentIntoDb,
  getAllContentFromDb,
  getContentByDomain,
  getContentByCategory,
  getContentBySubcategory,
  getContentById,
  updateContentIntoDb,
};

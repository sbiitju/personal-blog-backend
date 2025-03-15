import mongoose from 'mongoose';
import { Content } from './content.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IContent } from './content.interface';

const creeateContentIntoDb = async (content: IContent) => {
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

export const ContentService = {
  creeateContentIntoDb,
};

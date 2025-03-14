import { model, Schema } from 'mongoose';
import { IPolitical, PoliticalModel } from './political.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const politicalSchema = new Schema<IPolitical, PoliticalModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
    },
    profilePicture: {
      type: String,
    },
    socialLinks: {
      facebook: {
        type: String,
      },
      youtube: {
        type: String,
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
    },
    domain: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

politicalSchema.pre('validate', async function (next) {
  const existingUser = await Political.findOne({
    $or: [{ domain: this.domain }, { email: this.email }],
  });

  if (existingUser) {
    if (existingUser.domain === this.domain) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, 'This domain is already in use.'),
      );
    }
    if (existingUser.email === this.email) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, 'This email is already in use.'),
      );
    }
  }

  next();
});

export const Political = model<IPolitical, PoliticalModel>(
  'Political',
  politicalSchema,
);

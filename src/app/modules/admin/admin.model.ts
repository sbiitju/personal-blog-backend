import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const adminSchema = new Schema<IAdmin>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// Pre-Validation Hook for Checking Existing Domain and Email
adminSchema.pre('validate', async function (next) {
  const existingAdmin = await Admin.findOne({
    $or: [{ domain: this.domain }, { email: this.email }],
  });

  if (existingAdmin) {
    if (existingAdmin.domain === this.domain) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, 'This domain is already in use.'),
      );
    }
    if (existingAdmin.email === this.email) {
      return next(
        new AppError(httpStatus.BAD_REQUEST, 'This email is already in use.'),
      );
    }
  }

  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);

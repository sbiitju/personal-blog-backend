import { model, Schema } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const adminSchema = new Schema<IAdmin>({
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
  },
  phone: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
});

// domain checking
adminSchema.pre('save', async function (next) {
  const isUserExistsByDomain = await Admin.findOne({
    domain: this.domain,
  });

  const isUserExistsByEmail = await Admin.findOne({
    email: this.email,
  });

  if (isUserExistsByDomain) {
    throw new AppError(httpStatus.NOT_FOUND, 'This domain is aleready used');
  }

  if (isUserExistsByEmail) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Email is aleready used');
  }

  next();
});

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema);

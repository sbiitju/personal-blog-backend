import { model, Schema } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    password: {
      type: String,
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['admin', 'technical', 'political'],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    passwordChangedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  const user = this;
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }
  try {
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
    next();
  } catch (error: any) {
    return next(error);
  }
});

// set empty string after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Method to find user by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await this.findOne({ email }).select('+password'); // Always include password for comparison
};

// Method to compare password during login
userSchema.statics.isUserPasswordMatch = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<IUser, UserModel>('User', userSchema);

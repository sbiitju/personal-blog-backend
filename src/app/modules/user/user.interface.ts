import { Model } from 'mongoose';
import { USER_ROLE } from './user.constance';

export interface IUser {
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'political' | 'technical';
  isDeleted: boolean;
  isBlocked: boolean;
  passwordChangedAt?: Date;
}

export type TUserRole = keyof typeof USER_ROLE;

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;

  isUserPasswordMatch(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

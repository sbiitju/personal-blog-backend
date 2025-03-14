import { USER_ROLE } from './user.constance';

export interface IUser {
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'user';
  type: string;
  isDeleted: boolean;
  isBlocked: boolean;
}

export type TUserRole = keyof typeof USER_ROLE;

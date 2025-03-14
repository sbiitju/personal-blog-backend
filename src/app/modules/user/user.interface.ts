export interface IUser {
  password: string;
  needsPasswordChange: boolean;
  role: string;
  type: string;
  isDeleted: boolean;
  isBlocked: boolean;
}

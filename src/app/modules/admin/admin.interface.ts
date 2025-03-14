import { Model, Types } from 'mongoose';

export interface IAdmin {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  domain: string;
}

export interface AdminModel extends Model<IAdmin> {
    isUserExistsByDomain(domain: string): Promise<IAdmin | null>;
    isUserExistsByEmail(email: string): Promise<IAdmin | null>;
}

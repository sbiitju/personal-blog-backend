import { Types } from 'mongoose';

export interface ISubcategory {
  name: string;
  parentCategory: Types.ObjectId;
}

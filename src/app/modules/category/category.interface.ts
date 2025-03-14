import { Types } from 'mongoose';

export interface ISubcategory {
  name: string;
  parentCategory: Types.ObjectId;
}

export interface ICategory {
  name: string;
  role: 'admin' | 'political' | 'technical';
  subcategories: ISubcategory[];
}

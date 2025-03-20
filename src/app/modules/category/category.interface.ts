import { Types } from 'mongoose';

export interface ISubcategory {
  name: string;
  route: string;
  title: string;
  parentCategory: Types.ObjectId;
}

export interface ICategory {
  name: string;
  route: string;
  title: string;
  role: 'admin' | 'political' | 'technical';
  subcategories: ISubcategory[];
}

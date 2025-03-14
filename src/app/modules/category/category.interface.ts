import { Types } from 'mongoose';

export interface ISubcategory {
  name: string;
  parentCategory: Types.ObjectId;
}

export interface ICategory {
  name: string;
  subcategories: ISubcategory[];
}

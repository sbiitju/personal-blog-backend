import { Schema, model, Types } from 'mongoose';
import { ISubcategory } from './sub-category.interface';

const subcategorySchema = new Schema<ISubcategory>(
  {
    name: { type: String, required: true },
    parentCategory: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  { timestamps: true },
);

export const Subcategory = model<ISubcategory>(
  'Subcategory',
  subcategorySchema,
);

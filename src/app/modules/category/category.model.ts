import { Schema, model, Types } from 'mongoose';
import { ICategory } from './category.interface';

const subcategorySchema = new Schema(
  {
    name: { type: String, required: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true }
);

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    subcategories: [subcategorySchema],
    role: { type: String, enum: ['admin', 'political', 'technical'], required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', categorySchema);

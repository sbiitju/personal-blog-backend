import { Schema, model, Types } from 'mongoose';
import { ICategory } from './category.interface';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],  
    role: { type: String, enum: ['admin', 'political', 'technical'], required: true },
  },
  { timestamps: true }
);

export const Category = model<ICategory>('Category', categorySchema);

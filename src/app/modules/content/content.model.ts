import { model, Schema } from 'mongoose';
import { IContent } from './content.interface';

const contentSchema = new Schema<IContent>({
  domain: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String },
  place: { type: String, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
});

export const Content = model<IContent>('Content', contentSchema);

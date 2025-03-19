import { Schema, model } from 'mongoose';
import { IBiograph } from './biograph.interface';

const BiographSchema = new Schema<IBiograph>(
  {
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Biograph = model<IBiograph>('Biograph', BiographSchema);

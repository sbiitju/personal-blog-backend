import { Schema, model } from 'mongoose';

interface IBiograph {
  description: string;
  domain: string;
}

const BiographSchema = new Schema<IBiograph>(
  {
    description: { type: String, required: true },
    domain: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const Biograph = model<IBiograph>('Biograph', BiographSchema);

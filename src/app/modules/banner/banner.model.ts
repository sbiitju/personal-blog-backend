import { model, Schema } from 'mongoose';
import { IBanner } from './banner.interface';

const bannerSchema = new Schema<IBanner>({
  domain: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const Banner = model<IBanner>('Banner', bannerSchema);

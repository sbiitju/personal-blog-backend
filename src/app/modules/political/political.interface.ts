import { Types } from 'mongoose';

export interface IPolitical {
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  bio?: string;
  profilePicture?: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  domain: string;
  position: string;
  address: string;
}

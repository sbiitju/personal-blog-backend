import { Model, Types } from 'mongoose';

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
  emailJs?: {
    serviceId?: string;
    templateId?: string;
    publicKey?: string;
    toEmail?: string;
  };
}

export interface PoliticalModel extends Model<IPolitical> {
  isUserExistsByDomain(domain: string): Promise<IPolitical | null>;
  isUserExistsByEmail(email: string): Promise<IPolitical | null>;
}

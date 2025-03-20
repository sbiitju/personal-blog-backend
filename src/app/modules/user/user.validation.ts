import { z } from 'zod';

const createClientSchema = z.object({
  password: z.string().optional(),
  role: z.string().optional(),
  client: z.object({
    user: z.string().optional(), 
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }),
    dateOfBirth: z.preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date({ required_error: 'Date of birth is required' }),
    ),
    bio: z.string().optional(),
    profilePicture: z.string().url('Invalid URL').optional(),
    socialLinks: z
      .object({
        facebook: z.string().url('Invalid Facebook URL').optional(),
        youtube: z.string().url('Invalid YouTube URL').optional(),
        instagram: z.string().url('Invalid Instagram URL').optional(),
        twitter: z.string().url('Invalid Twitter URL').optional(),
      })
      .optional(),
    domain: z.string({ required_error: 'Domain is required' }),
    position: z.string({ required_error: 'Position is required' }),
    address: z.string({ required_error: 'Address is required' }),
  }),
});

const createAdminSchema = z.object({
  password: z.string().optional(),
  admin: z.object({
    user: z.string().optional(),
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email format'),
    phone: z.string({ required_error: 'Phone number is required' }),
    domain: z.string({ required_error: 'Domain is required' }),
  }),
});

export const userValidation = {
  createClientSchema,
  createAdminSchema,
};

import { z } from 'zod';

const updatePoliticalProfileSchema = z.object({
  name: z.string().optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().optional(),
  dateOfBirth: z
    .preprocess(
      (arg) =>
        typeof arg === 'string' || arg instanceof Date
          ? new Date(arg)
          : undefined,
      z.date(),
    )
    .optional(),
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
  domain: z.string().optional(),
  position: z.string().optional(),
  address: z.string().optional(),
});

const getPoliticalByDomainSchema = z.object({
  domain: z.string({ required_error: 'Domain is required' }),
});

export const politicalValidation = {
  updatePoliticalProfileSchema,
  getPoliticalByDomainSchema,
};

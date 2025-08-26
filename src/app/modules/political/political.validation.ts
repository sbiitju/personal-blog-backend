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
      facebook: z.string().refine((val) => !val || /^https?:\/\/.+/.test(val), {
        message: 'Invalid Facebook URL',
      }).optional(),
      youtube: z.string().refine((val) => !val || /^https?:\/\/.+/.test(val), {
        message: 'Invalid YouTube URL',
      }).optional(),
      instagram: z.string().refine((val) => !val || /^https?:\/\/.+/.test(val), {
        message: 'Invalid Instagram URL',
      }).optional(),
      twitter: z.string().refine((val) => !val || /^https?:\/\/.+/.test(val), {
        message: 'Invalid Twitter URL',
      }).optional(),
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

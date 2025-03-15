import { z } from 'zod';

const createBiographSchema = z.object({
  description: z.string({ required_error: 'Description is required' }),
  domain: z.string({ required_error: 'Domain is required' }),
});

const updateBiographSchema = z.object({
  description: z.string().optional(),
  domain: z.string().optional(),
});

export const BiogaraphValidation = {
  createBiographSchema,
  updateBiographSchema,
};

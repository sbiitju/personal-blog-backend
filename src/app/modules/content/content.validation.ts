import { z } from 'zod';

const createContentSchema = z.object({
  domain: z.string().min(1, 'Domain is required'),
  title: z.string().min(1, 'Title is required'),
  date: z.string().optional(),
  place: z.string().min(1, 'Place is required'),
  description: z.string().min(1, 'Description is required'),
  photo: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
});

export const ContentValidation = {
  createContentSchema,
};

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
const updateContentSchema = z.object({
  domain: z.string(),
  title: z.string().optional(),
  date: z.string().optional(),
  place: z.string().optional(),
  description: z.string().optional(),
  photo: z.string().optional(),
  category: z.string().optional(),
  subcategory: z.string().optional(),
});

export const ContentValidation = {
  createContentSchema,
};

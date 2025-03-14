import { z } from 'zod';

const createCategorySchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  role: z.enum(['admin', 'political', 'technical'], {
    required_error: 'Role is required',
  }),
});

const createSubcategorySchema = z.object({
  name: z.string({ required_error: 'Name is required' }),
  parentCategory: z.string({ required_error: 'Parent category is required' }),
});

export const categoryValidation = {
  createCategorySchema,
  createSubcategorySchema,
};

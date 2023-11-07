import { z } from 'zod';

export const createUserValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  cognito_id: z.string(),
});

export const updateUserValidation = z.object({
  first_name: z.string(),
  last_name: z.string(),
  description: z.string(),
});

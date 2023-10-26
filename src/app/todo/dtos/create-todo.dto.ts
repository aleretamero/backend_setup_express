import { z } from 'zod';

export const createTodoDtoSchema = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
  })
  .strict();

export interface CreateTodoDto extends z.infer<typeof createTodoDtoSchema> {}

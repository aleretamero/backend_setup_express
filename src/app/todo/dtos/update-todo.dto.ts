import { z } from 'zod';

export const updateTodoDtoSchema = z
  .object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    done: z.boolean(),
  })
  .partial()
  .strict();

export interface UpdateTodoDto extends z.infer<typeof updateTodoDtoSchema> {}

import { z } from "zod";

export const createTodoDto = z.object({
  title: z.string("Should be string").min(2, "Required is at least 2 symbols"),
  content: z.string("Should be string").max(300, "Max 300 symbols").optional(),
  userId: z.uuid("Invalid id"),
});

export type CreateTodoDto = z.infer<typeof createTodoDto>;

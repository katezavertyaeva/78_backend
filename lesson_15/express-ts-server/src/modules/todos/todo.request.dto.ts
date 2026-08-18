import { z } from "zod";

export const createTodoDto = z.object({
  title: z.string("Should be string").min(2, "Required is at least 2 symbols"),
  content: z.string("Should be string").max(300, "Max 300 symbols").optional(),
  userId: z.uuid("Invalid id"),
});

export const updateTodoDto = z
  .object({
    title: z
      .string("Should be string")
      .min(2, "Required is at least 2 symbols")
      .optional(),
    content: z
      .string("Should be string")
      .max(300, "Max 300 symbols")
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Title or content should be specified",
  });

export type CreateTodoDto = z.infer<typeof createTodoDto>;
export type UpdateTodoDto = z.infer<typeof updateTodoDto>;

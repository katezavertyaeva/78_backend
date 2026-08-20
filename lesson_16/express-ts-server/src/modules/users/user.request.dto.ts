import { z } from "zod";

export const registerDto = z.object({
  email: z.email("Email is not valid"),
  password: z.string().trim().min(8, "Min length is 8 symbols"),
});

export const loginDto = z.object({
  email: z.email("Email is not valid"),
  password: z.string().trim().min(8, "Min length is 8 symbols"),
});

export type RegisterDto = z.infer<typeof registerDto>;
export type LoginDto = z.infer<typeof loginDto>;


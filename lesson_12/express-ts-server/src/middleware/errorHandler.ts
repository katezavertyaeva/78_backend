import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

import { InvalidCredentialsError, UserAlreadyExistsError } from "../lib/errors";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  // Domain errors
  if (error instanceof UserAlreadyExistsError) {
    return res.status(409).json({ error: error.message });
  }

  if (error instanceof InvalidCredentialsError) {
    return res.status(400).json({ error: error.message });
  }

  // Zod errors
  if (error instanceof ZodError) {
    return res
      .status(400)
      .json({ error: "Validation error", details: z.treeifyError(error) });
  }

  // DB error

  // fallback
  return res.status(500).json({ error: "Internal Server Error" });
}


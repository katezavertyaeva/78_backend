import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

import { InvalidCredentialsError, UserAlreadyExistsError } from "../lib/errors";
import { DatabaseError } from "pg";
import { logger } from "../lib/logger";

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
  const dbError = extractPgError(error);
  if(dbError){
    return handleDbError(dbError, res)
  }

  // fallback
  return res.status(500).json({ error: "Internal Server Error" });
}

// Helper function for db errors
function extractPgError(error: unknown): DatabaseError | null {
  if (!error || typeof error != "object") return null;

  if ("code" in error && typeof (error as any).code === "string") {
    return error as DatabaseError;
  }

  // {messsage: "error message", code: "35467"}
  // {message: "error message", cause: {code: "2532"}} // DrizzleQueryError

  if (
    "cause" in error &&
    error.cause &&
    typeof error.cause === "object" &&
    typeof (error as any).code === "string"
  ) {
    return error.cause as DatabaseError;
  }

  return null;
}

function handleDbError(error: DatabaseError, res: Response) {
  logger.info("****** DB Error ******");

  switch (error.code) {
    case "23505":
      return res.status(409).json({
        error: "Dublicate value",
        details: error.detail,
      });
    case "23503":
      return res.status(400).json({
        error: "Invalid reference",
        details: error.detail,
      });
    case "23502":
      return res.status(400).json({
        error: "Missing required field",
        details: error.detail,
      });
    default:
      return res.status(500).json({ error: "DB Error", code: error.code });
  }
}

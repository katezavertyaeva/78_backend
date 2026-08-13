import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export const privateGuard = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  logger.warn("Private Guard middleware - check");

  if (token !== "qwerty007") {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

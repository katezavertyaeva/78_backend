import { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { UserRepository } from "../modules/users/user.entity";
import { verifyToken } from "../lib/jwt";
import toUserResponse from "../modules/users/user.mapper";

type AccessTokenPayload = JwtPayload & {
  userId?: string;
};

export const createCurrentUserMiddleware =
  (repo: UserRepository) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ error: "Authorization header is required" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Bearer is required" });
    }

    try {
      const payload = verifyToken(token);
      const userId =
        typeof payload === "string"
          ? undefined
          : (payload as AccessTokenPayload).userId;

      if (typeof userId !== "string") {
        return res.status(401).json({ error: "Invalid token payload" });
      }

      const user = await repo.findById(userId);

      if (!user) {
        return res.status(401).json({ error: "User from token not found" });
      }
// Проверить ошибку
      req.currentUser = toUserResponse(user);
      next();
    } catch {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  };

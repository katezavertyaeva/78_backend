import { Router } from "express";
import { UserController } from "./user.controller";
import { createCurrentUserMiddleware } from "../../middleware/current-user.middleware";
import { UserRepository } from "./user.entity";

export function createUserRouter(
  controller: UserController,
  repo: UserRepository,
): Router {
  const router = Router();
  router.post("/register", controller.register);
  router.post("/login", controller.login);
  router.get("/me", createCurrentUserMiddleware(repo), controller.currentUser);

  return router;
}

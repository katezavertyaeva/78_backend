import { Router } from "express";
import { UserController } from "./user.controller";

export function createUserRouter(controller: UserController): Router {
  const router = Router();
  router.post("/register", controller.register);
  router.post("/login", controller.login);

  return router;
}

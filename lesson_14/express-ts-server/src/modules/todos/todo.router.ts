// Здесь только маршрутизация

import { Router } from "express";
import { TodoController } from "./todo.controller";
import { UserRepository } from "../users/user.entity";
import { createCurrentUserMiddleware } from "../../middleware/current-user.middleware";

export function createTodoRouter(
  controller: TodoController,
  userRepo: UserRepository,
) {
  const router = Router();
  router.use(createCurrentUserMiddleware(userRepo));

  router.get("/", controller.getAll);
  router.post("/", controller.create);
  router.get("/:id", controller.getOne);
  router.delete("/:id", controller.delete);

  return router;
}

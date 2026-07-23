// Здесь только маршрутизация

import { Router } from "express";
import { TodoController } from "./todo.controller";

export function createTodoRouter(controller: TodoController) {
  const router = Router();
  router.get("/", controller.getAll);
  router.post("/", controller.create);

  return router;
}

// writing - соединим все независимые слои

import { Router } from "express";
import { InMemoryRepository } from "./todo.repository";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { createTodoRouter } from "./todo.router";

export function buildTodoRouter(): Router {
  const repo = new InMemoryRepository();
  const service = new TodoService(repo);
  const controller = new TodoController(service);

  return createTodoRouter(controller);
}

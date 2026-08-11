import { Router } from "express";

import { UserController } from "./user.controller";
import { DrizzleUserRepository } from "./user.repository";
import { createUserRouter } from "./user.router";
import UserService from "./user.service";

export function buildUserRouter(): Router {
  const repo = new DrizzleUserRepository();
  const service = new UserService(repo);
  const controller = new UserController(service);

  return createUserRouter(controller, repo);
}

import {
  createTodoDto,
  CreateTodoDto,
  updateTodoDto,
} from "./todo.request.dto";
import { TodoService } from "./todo.service";
import { NextFunction, Request, Response } from "express";

// Adapter layer - http requests, req, res, express, error
export class TodoController {
  constructor(private readonly service: TodoService) {
    this.service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    const todos = await this.service.getAll();
    res.status(200).json(todos);
  };

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.currentUser?.id;
      const data: CreateTodoDto = createTodoDto.parse({ ...req.body, userId });
      const result = await this.service.create(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string" || !id) {
        return res.status(400).json({ error: "Bad request" });
      }

      const userId = req.currentUser?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unautorized" });
      }

      const todo = await this.service.getTodo(id, userId);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string" || !id) {
        return res.status(400).json({ error: "Bad request" });
      }

      const userId = req.currentUser?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unautorized" });
      }

      const todo = await this.service.deleteTodo(id, userId);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id;

      if (typeof id !== "string" || !id) {
        return res.status(400).json({ error: "Bad request" });
      }

      const userId = req.currentUser?.id;

      if (!userId) {
        return res.status(401).json({ error: "Unautorized" });
      }

      const updateDto = updateTodoDto.parse(req.body);
      const todo = await this.service.updateTodo(id, userId, updateDto);
      res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  };
}

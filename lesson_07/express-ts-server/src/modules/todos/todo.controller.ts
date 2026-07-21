import { TodoService } from "./todo.service";
import { Request, Response } from "express";

// Adapter layer - http requests, req, res, express, error
export class TodoController {
  constructor(private readonly service: TodoService) {
    this.service = service;
  }

  getAll = async (_req: Request, res: Response) => {
    const todos = await this.service.getAll();
    res.status(200).json(todos);
  };

  create = async (req: Request, res: Response) => {
    const { title } = req.body;

    // if(!title){
    //     res.status(400).json({error: "Bad request"})
    // }

    try {
      const todo = await this.service.create(title);
      res.status(201).json(todo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  };
}

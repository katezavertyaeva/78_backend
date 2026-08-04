import UserService from "./user.service";
import { Request, Response } from "express";

export class UserController {
  constructor(private readonly service: UserService) {}

  register = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const result = await this.service.register(email, password);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const result = await this.service.login(email, password);
      res.status(200).json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  };
}

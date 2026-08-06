import {
  LoginDto,
  loginDto,
  registerDto,
  RegisterDto,
} from "./user.request.dto";
import UserService from "./user.service";
import { NextFunction, Request, Response } from "express";

export class UserController {
  constructor(private readonly service: UserService) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: RegisterDto = registerDto.parse(req.body);
      const result = await this.service.register(data);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: LoginDto = loginDto.parse(req.body);
      const result = await this.service.login(data);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}

import { UserResponseDto } from "../modules/users/user.response.dto";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserResponseDto;
    }
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
    };
  }
}

export {};

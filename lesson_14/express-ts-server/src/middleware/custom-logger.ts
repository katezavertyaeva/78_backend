import { Request, Response, NextFunction } from "express";

export const customLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const method = req.method;
  const url = req.url;
  console.log(`${method} - ${url}`);

  //   Функция next не позволяет остановить процесс после того, как
  // сработал middleware, если её не использовать, то клиент не получит ответ
  next();
};

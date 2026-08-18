import express from "express";
import { pinoHttp } from "pino-http";
import cookieParser from "cookie-parser";

import "./types/express";
import postsRouter from "./modules/posts/routes/posts.routes";
import { buildTodoRouter } from "./modules/todos/todo.containers";
import { customLogger } from "./middleware/custom-logger";
import { logger } from "./lib/logger";
import { privateGuard } from "./middleware/private-guard";
import { buildUserRouter } from "./modules/users/user.containers";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cookieParser());

app.use(express.json());

// Вызов middleware для каждого запроса
app.use(customLogger);

// Подключение логгера из библиотеки pino
app.use(pinoHttp({ logger }));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Преминение middleware для определенного запроса
app.get("/private", privateGuard, (_req, res) => {
  res
    .status(200)
    .json({ message: "This is private information. You are have access" });
});

app.use("/posts", postsRouter);
app.use("/todos", buildTodoRouter());
app.use("/users", buildUserRouter());

// ----cookies
// How to set cookie tothe frontend
app.post("/collect", (req, res) => {
  const { email } = req.body;

  res.cookie("user_email", email, {
    path: "/user-info",
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1h
  });

  res.status(200).json({ message: "Cookie has been set" });
});

// How to read cookie
app.get("/user-info", (req, res) => {
  const userInfo = req.cookies.user_email;
  res.status(200).json({ userInfo });
});

// How delete cookie
app.delete("/user-info", (_req, res) => {
  res.cookie("user_email", "", {
    path: "/user-info",
    httpOnly: true,
    maxAge: 0,
  });

  res.status(200).json({ message: "Cookies deleted" });
});
// ----cookies

// ! error handler обязательно должен быть последним
app.use(errorHandler);

export default app;

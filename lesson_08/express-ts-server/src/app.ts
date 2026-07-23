import express from "express";
import { pinoHttp } from "pino-http";

import postsRouter from "./modules/posts/routes/posts.routes";
import { buildTodoRouter } from "./modules/todos/todo.containers";
import { customLogger } from "./middleware/custom-logger";
import { logger } from "./lib/logger";
import { privateGuard } from "./middleware/private-guard";

const app = express();

app.use(express.json());

// Вызов middleware для каждого запроса
app.use(customLogger);

// Подключение логгера из библиотеки pino
app.use(pinoHttp({logger}));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

// Преминение middleware для определенного запроса
app.get("/private", privateGuard,  (_req, res) => {
  res.status(200).json({ message: "This is private information. You are have access" });
})

app.use("/posts", postsRouter);
app.use("/todos", buildTodoRouter());

export default app;

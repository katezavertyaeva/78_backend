import { Router } from "express";
import { v7 } from "uuid";

import { Post } from "../posts.types";

// С помощью router в дальнейшем мы сможем прописывать
// логику ответов на запросы (router.get())
const router = Router();

// Пока мы будем хранить данные локально (без БД).
// Мы сможем использовать любые методы и они будут работать, но
// при перезагрузке сервера данные (новые) будут потеряны
const posts: Post[] = [
  { id: v7(), title: "Cloudy weather", text: "It is dark again" },
  { id: v7(), title: "Job", text: "I got new job!" },
];

// GET /posts
// Так как в index.ts мы используем url /posts, то в данном
// файле мы можем не указывать каждый раз /posts, а указывать просто /
router.get("/", (_req, res)=>{
    res.status(200).json(posts)
})

export default router;
# 📦 1. `req.params`

## 👉 Что это

`req.params` — это **параметры из URL (динамические части пути)**

---

## 🔧 Пример

```ts
app.get("/users/:id", (req, res) => {
  console.log(req.params);
});
```

👉 Запрос:

```
GET /users/42
```

👉 Результат:

```json
{ "id": "42" }
```

---

## 🧠 Когда использовать

- получение ресурса по id
- динамические маршруты

---

## ⚠️ Важно

Все значения — **строки**

```ts
const id = Number(req.params.id);
```

---

# 📦 2. `req.body`

## 👉 Что это

`req.body` — это **данные, отправленные в теле запроса**

---

## 🔧 Пример

```ts
app.post("/users", (req, res) => {
  console.log(req.body);
});
```

👉 Запрос:

```json
{
  "username": "alex",
  "age": 25
}
```

👉 Результат:

```json
{ "username": "alex", "age": 25 }
```

---

## ⚠️ ВАЖНО

Чтобы это работало:

```ts
app.use(express.json());
```

---

## 🧠 Когда использовать

- создание данных (POST)
- обновление (PUT / PATCH)

---

# 📦 3. Разница `params` vs `body`

|       | `req.params` | `req.body`   |
| ----- | ------------ | ------------ |
| Где   | URL          | тело запроса |
| Метод | GET чаще     | POST / PUT   |
| Тип   | строка       | любой (json) |

---

## 🔥 Пример вместе

```ts
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username } = req.body;

  res.send(`Update user ${id} -> ${username}`);
});
```

---

# 📦 4. Router (разделение роутов)

## 👉 Что это

`Router` — это способ **разделить маршруты по файлам**

---

## 🔧 Проблема без Router

```ts
app.get("/users", ...)
app.post("/users", ...)
app.get("/products", ...)
app.post("/products", ...)
```

👉 файл становится огромным 😵

---

## ✅ Решение — Router

## 📁 Структура

```
src/
 ├── index.ts
 └── routes/
      └── users.ts
```

---

## 🧩 users.ts

```ts
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("All users");
});

router.post("/", (req, res) => {
  res.send("Create user");
});

export default router;
```

---

## 🧩 index.ts

```ts
import express from "express";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());

// 👇 подключаем роуты
app.use("/users", usersRouter);

app.listen(3000);
```

---

## 🔥 Как это работает

```ts
app.use("/users", usersRouter);
```

👉 значит:

| URL         | Обработчик       |
| ----------- | ---------------- |
| GET /users  | router.get("/")  |
| POST /users | router.post("/") |

---

# 🧠 Преимущества Router

✅ чистый код
✅ разделение логики
✅ удобно масштабировать
✅ как в реальных проектах

---

# 💡 Итог

- `req.params` → из URL (`/users/:id`)
- `req.body` → из тела запроса (JSON)
- `Router` → разбивает сервер на модули

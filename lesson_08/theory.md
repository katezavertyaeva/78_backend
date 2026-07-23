### 📌 Что такое middleware в Express.js

**Middleware (промежуточное ПО)** — это функции, которые выполняются **между получением HTTP-запроса и отправкой ответа** в приложении на Express.

Проще говоря:
👉 это «шаги обработки запроса», которые идут по цепочке.

---

## 🔧 Сигнатура middleware

```js
(req, res, next) => { ... }
```

- `req` — объект запроса
- `res` — объект ответа
- `next` — функция, которая передаёт управление следующему middleware

---

## 🔄 Как работает цепочка

Когда приходит запрос:

1. Express проходит по всем middleware по порядку
2. Каждый middleware может:
   - изменить `req` или `res`
   - завершить запрос (`res.send()`)
   - передать управление дальше (`next()`)

📍 Важно: если не вызвать `next()` и не отправить ответ — запрос «зависнет».

---

## 📂 Виды middleware

### 1. Application-level middleware

Применяется ко всему приложению или маршруту:

```js
app.use((req, res, next) => {
  console.log("Запрос получен");
  next();
});
```

---

### 2. Router-level middleware

```js
const router = express.Router();

router.use((req, res, next) => {
  console.log("Router middleware");
  next();
});
```

---

### 3. Built-in middleware

Встроенные в Express:

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

---

### 4. Third-party middleware

Подключаются через npm:

- morgan — логирование
- cors — CORS
- body-parser — парсинг тела запроса (устарел, но важен исторически)

---

### 5. Error-handling middleware

Особый тип (4 аргумента):

```js
(err, req, res, next) => {
  res.status(500).send("Ошибка!");
};
```

📍 Используется для обработки ошибок.

---

## ⚙️ Пример цепочки middleware

```js
app.use((req, res, next) => {
  console.log("1");
  next();
});

app.use((req, res, next) => {
  console.log("2");
  next();
});

app.get("/", (req, res) => {
  res.send("Готово");
});
```

📤 Результат в консоли:

```
1
2
```

---

## 🎯 Основные задачи middleware

- Аутентификация пользователя
- Логирование запросов
- Валидация данных
- Обработка ошибок
- Парсинг тела запроса
- Настройка заголовков

---

## 🧠 Важные принципы

✔ Порядок подключения имеет значение
✔ Middleware может завершить запрос
✔ Можно использовать несколько middleware подряд
✔ `next()` — ключ к управлению потоком

---

## 🚀 Короткая аналогия

Middleware — это как **конвейер на заводе**:
каждый шаг что-то делает с запросом, пока он не превратится в ответ.

---

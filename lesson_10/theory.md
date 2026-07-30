# 🧠 1. Две разные “сети”

Когда ты работаешь с Docker, есть **2 уровня**:

### 1. Внутри Docker (между контейнерами)

* работает **своя сеть**
* контейнеры общаются по **именам сервисов**

### 2. Снаружи (твой localhost)

* ты заходишь через `localhost:PORT`
* используется проброс портов

---

# 📦 2. Имена сервисов = DNS внутри Docker

В твоём `docker-compose`:

```yaml
services:
  app:
  db:
```

👉 Внутри сети Docker:

* `app` доступен по имени: `app`
* `db` доступен по имени: `db`

### Пример подключения к БД:

```ts
host: "db"
port: 5432
```

❗ НЕ `localhost` — это частая ошибка

---

# 🔥 3. Почему НЕ localhost?

Внутри контейнера:

* `localhost` = **сам контейнер**
* НЕ твой компьютер
* НЕ другой контейнер

---

# 🌐 4. Проброс портов (ports)

Вот эта часть:

```yaml
ports:
  - "3000:3000"
```

означает:

```
localhost:3000  →  container:3000
```

Формат:

```
HOST_PORT : CONTAINER_PORT
```

---

# 📊 5. Таблица соответствий

| Откуда         | Куда          | Что писать       |
| -------------- | ------------- | ---------------- |
| Браузер        | app           | `localhost:3000` |
| app → db       | db container  | `db:5432`        |
| app → сам себя | app container | `localhost:3000` |

---

# 🧩 6. Пример с твоим docker-compose

### Контейнеры:

* `app` (Express)
* `db` (Postgres)

---

### 👉 Как подключается Express к Postgres:

```env
DB_HOST=db
DB_PORT=5432
```

---

### 👉 Как ты открываешь API:

```
http://localhost:3000
```

---

# ⚠️ 7. Частые ошибки

## ❌ Ошибка 1

```env
DB_HOST=localhost
```

👉 НЕ будет работать внутри Docker

---

## ❌ Ошибка 2

```env
DB_HOST=127.0.0.1
```

👉 тоже нет

---

## ❌ Ошибка 3

```yaml
ports:
  - "5432:5432"
```

И потом в app:

```ts
host: "localhost"
```

👉 это работает **только с хоста**, не между контейнерами

---

# 🧪 8. Когда нужен localhost?

### Используется только:

* когда ты снаружи Docker
* например:

  * браузер
  * Postman
  * локальный pgAdmin

---

# 🔌 9. Нужно ли открывать порт DB?

```yaml
ports:
  - "5432:5432"
```

👉 НЕ обязательно, если:

* только `app` использует БД

👉 Нужно, если:

* хочешь подключаться снаружи (например через DBeaver)

---

# 🧠 10. Короткая ментальная модель

Запомни так:

```
Docker внутри:
  общение по именам сервисов (db, app)

Снаружи:
  через localhost:port
```

---

# 🚀 Мини-итог

* `db` → имя контейнера (внутри сети)
* `localhost` → твой компьютер
* `3000:3000` → мост между мирами
* контейнер ≠ хост





---
## 🧠 Конспект по Drizzle ORM (CRUD)

---

# 📦 1. Описание таблицы (schema)

```ts
export const todos = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
});
```

---

## 🔑 Основные типы

| Тип                   | Описание   |
| --------------------- | ---------- |
| `uuid()`              | UUID       |
| `varchar({ length })` | строка     |
| `text()`              | текст      |
| `boolean()`           | true/false |
| `integer()`           | число      |
| `timestamp()`         | дата       |

---

## 🔧 Модификаторы

```ts
.notNull()
.default(value)
.defaultNow()
.primaryKey()
.unique()
```

---

# 📊 2. Типизация

```ts
export type Todo = typeof todos.$inferSelect; - все поля
export type NewTodo = typeof todos.$inferInsert; - с опциональными полями
```
$inferSelect = полный объект из базы
$inferInsert = объект для вставки (с optional полями)
избавляет от ручных типов
всегда синхронизирован со схемой
---

# 📖 3. READ (получение данных)

### Получить все записи

```ts
await db.select().from(todos);
```

---

### Получить по id

```ts
import { eq } from "drizzle-orm";

await db.select().from(todos).where(eq(todos.id, id));
```

---

### Получить один объект

```ts
const [todo] = await db
  .select()
  .from(todos)
  .where(eq(todos.id, id));
```

---

# ➕ 4. CREATE

```ts
const [todo] = await db
  .insert(todos)
  .values({ title, done: false })
  .returning();
```

---

# ✏️ 5. UPDATE

```ts
await db
  .update(todos)
  .set({ done: true })
  .where(eq(todos.id, id));
```

---

### С возвратом результата

```ts
const [updated] = await db
  .update(todos)
  .set({ done: true })
  .where(eq(todos.id, id))
  .returning();
```

---

# ❌ 6. DELETE

```ts
await db
  .delete(todos)
  .where(eq(todos.id, id));
```

---

### С возвратом

```ts
const [deleted] = await db
  .delete(todos)
  .where(eq(todos.id, id))
  .returning();
```

---

# 🔍 7. Фильтрация (WHERE)

```ts
import { eq, and, or } from "drizzle-orm";
```

---

### Примеры

```ts
where(eq(todos.done, false));
```

```ts
where(and(
  eq(todos.done, false),
  eq(todos.title, "test")
));
```

```ts
where(or(
  eq(todos.done, true),
  eq(todos.done, false)
));
```

---

# 📌 8. Выбор конкретных полей

```ts
await db
  .select({
    id: todos.id,
    title: todos.title,
  })
  .from(todos);
```

---

# 🧱 9. Пример Repository (CRUD)

```ts
import { eq } from "drizzle-orm";

export class DrizzleRepository {
  async findAll(): Promise<Todo[]> {
    return db.select().from(todos);
  }

  async findById(id: string): Promise<Todo | null> {
    const [todo] = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id));

    return todo ?? null;
  }

  async create(title: string): Promise<Todo> {
    const [todo] = await db
      .insert(todos)
      .values({ title })
      .returning();

    return todo;
  }

  async update(id: string, data: Partial<NewTodo>): Promise<Todo | null> {
    const [updated] = await db
      .update(todos)
      .set(data)
      .where(eq(todos.id, id))
      .returning();

    return updated ?? null;
  }

  async delete(id: string): Promise<Todo | null> {
    const [deleted] = await db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();

    return deleted ?? null;
  }
}
```

---

# ⚡ 10. Основные операции

```ts
select → получение данных
insert → создание
update → обновление
delete → удаление
```

---

# 🧠 11. Базовый паттерн

```ts
db.operation(table)
  .method(...)
  .where(eq(table.field, value))
```

---

# 🚀 Минимум для работы

* `select / insert / update / delete`
* `where + eq`
* `.returning()` (PostgreSQL)
* `$inferSelect / $inferInsert`

---

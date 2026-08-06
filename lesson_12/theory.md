## 🧠 Конспект: валидация с Zod

---

### 1. Что такое Zod
https://zod.dev/

**Zod** — библиотека для:

- валидации данных
- парсинга (очистки) данных
- генерации типов TypeScript

> Схема = источник истины для данных

---

### 2. Основная идея

Описывается схема → данные проверяются → возвращается гарантированно корректный результат

---

### 3. Методы валидации

#### `.parse()`

```ts
schema.parse(data);
```

- возвращает валидные данные
- при ошибке выбрасывает `ZodError`

#### `.safeParse()`

```ts
schema.safeParse(data);
```

- `{ success: true, data }`
- `{ success: false, error }`

---

### 4. Схема как контракт

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
```

Схема выполняет:

- валидацию
- описание структуры
- источник типов

---

### 5. Инференс типов

```ts
type SchemaType = z.infer<typeof schema>;
```

Типы автоматически синхронизированы со схемой.

---

### 6. Основные примитивы

```ts
z.string();
z.number();
z.boolean();
z.date();
z.array();
z.object();
z.enum();
```

---

### 7. Модификаторы

```ts
z.string().optional(); // поле может отсутствовать
z.string().nullable(); // может быть null
```

---

### 8. Вложенные структуры

```ts
z.object({
  user: z.object({
    email: z.string().email(),
  }),
  tags: z.array(z.string()),
});
```

---

### 9. Дополнительные возможности

#### Трансформация

```ts
z.string().transform((val) => val.toLowerCase());
```

#### Кастомная проверка

```ts
z.string().refine((val) => val.length > 3);
```

#### Проверка зависимых полей

```ts
z.object({
  password: z.string(),
  confirm: z.string(),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirm) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirm"],
    });
  }
});
```

---

### 10. Что делает Zod

1. Проверяет данные
2. Преобразует данные
3. Возвращает безопасный результат

---

### 11. Где использовать

Используется на границе системы:

- входящие HTTP-запросы (`req.body`, `params`, `query`)

Не используется:

- в сервисах
- в репозиториях

---

### 12. Поток обработки

```text
Request → Zod → Controller → Service → Repository
```

---

### 13. Типичные ошибки

- отсутствие валидации входных данных
- дублирование типов вручную
- использование Zod вне слоя ввода
- смешивание бизнес-логики и валидации

---

### 14. Преимущества

- единый источник правды (schema)
- автоматическая типизация
- отсутствие магии
- предсказуемое поведение
- удобство масштабирования

---

### 15. Ключевая идея

> Zod — это механизм обеспечения корректности данных на границе системы.

## 🧠 Конспект: DTO и Mapper

---

# 📦 1. DTO (Data Transfer Object)

**DTO** — это объект, который используется для передачи данных между слоями системы.

> DTO = форма данных, которая выходит наружу или приходит внутрь

---

## 🎯 Зачем нужны DTO

- отделяют API от внутренней модели
- защищают данные (например, скрывают пароль)
- создают стабильный контракт для клиента
- упрощают изменение базы данных без влияния на API

---

## 🔽 Виды DTO

### 1. Request DTO (входящие данные)

```ts id="jkr14r"
type RegisterDto = {
  email: string;
  password: string;
};
```

Используется для:

- `req.body`
- валидации (Zod)

---

### 2. Response DTO (исходящие данные)

```ts id="2krgqk"
type UserResponseDto = {
  id: string;
  email: string;
  createdAt: string;
};
```

👉 без:

- пароля
- внутренних полей

---

## ⚠️ Важно

DTO ≠ Entity

| Entity (модель) | DTO                    |
| --------------- | ---------------------- |
| отражает БД     | отражает API           |
| содержит всё    | содержит только нужное |
| может меняться  | должен быть стабильным |

---

# 🔄 2. Mapper

**Mapper** — это функция, которая преобразует данные из одной формы в другую.

> Mapper = переводчик между слоями

---

## 🎯 Зачем нужен Mapper

- превращает Entity → DTO
- убирает лишние поля
- изменяет формат данных (например Date → string)
- централизует преобразования

---

## 🔽 Пример

### Entity (из базы)

```ts id="u8tgfg"
type User = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
};
```

---

### Response DTO

```ts id="qlp7zt"
type UserResponseDto = {
  id: string;
  email: string;
  createdAt: string;
};
```

---

### Mapper

```ts id="2fzqrz"
function toUserResponse(user: User): UserResponseDto {
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
  };
}
```

---

# 🧠 Где используется Mapper

Обычно:

- в контроллере
- или в отдельном слое (recommended)

---

# 🧱 Связка DTO + Mapper

```text id="6n6vce"
Entity (DB)
   ↓
Mapper
   ↓
Response DTO
   ↓
Client
```

---

# ⚠️ Частые ошибки

## ❌ Возвращать Entity напрямую

→ утечка пароля / внутренних данных

## ❌ Дублировать логику преобразования

→ хаос в коде

## ❌ Смешивать DTO и Entity

→ ломается архитектура

---

# 🧼 Правильный подход

- DTO описывает **что отдаём**
- Entity описывает **как храним**
- Mapper отвечает за **преобразование**

---

# 🧠 Итог

- **DTO** — контракт данных между слоями или с клиентом
- **Mapper** — преобразователь данных между форматами

> DTO отвечает за форму, Mapper — за преобразование

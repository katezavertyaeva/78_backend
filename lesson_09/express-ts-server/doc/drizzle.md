ORM - Object Relational Mapping
(Drizzle)

Это технология, которая связывает таблицы БД с объектами в коде
Мы сможем вызывать обычные функции и не прописывать вручную запросы на языке SQL

Зачем он нужен?
1. Ускорение разработки
2. Безопасность. Защита от sql инъекции
3. Миграция. Мы можем с лёгкостью перейти с одной СУБД на другую с
   минимальными изменениями в коде


1. Установили drizzle
```
npm i drizzle-orm pg dotenv
npm i -D drizzle-kit tsx @types/pg
```

2. Добавляем дополнительные скрипты для
работы с БД в package.json
```
    "db:generate": "npx drizzle-kit generate",
    "db:migrate": "npx drizzle-kit migrate",
```

3. Вносим изменения в tsconfig.json
```
    "rootDir": ".",
    "include": ["src/**/*", "drizzle.config.ts"],
```

4. Добавление файла drizzle.config.ts
```
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL_DRIZZLE_KIT!,
  },
});
```

5. Добавили переменные среды в .env

```
PORT = 3000
DATABASE_URL = postgresql://postgres:postgres@db:5432/mydb
DATABASE_URL_DRIZZLE_KIT = postgresql://postgres:postgres@localhost:5432/mydb

POSTGRES_USER = postgres
POSTGRES_PASSWORD = postgres
POSTGRES_DB = mydb
```

6. В папке src создаём папку db и в ней два файла index.ts и schema.ts

7. Заполняем файл index.ts 
```
import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';

export const db: NodePgDatabase = drizzle(process.env.DATABASE_URL!);
```

8. Заполняем файл schema.ts 
```
import {
  boolean,
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  done: boolean().notNull().default(false),
  createdAt: timestamp().notNull().defaultNow(),
});
```

9. Добавляем Dockerfile
```
FROM node:20

COPY package*.json ./
RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

10. Добавляем docker-compose.yml
```
services:
  app:
    build: .
    container_name: express-ts-app
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db
    env_file:
      - .env
    command: npm run dev

  db:
    image: postgres:16
    container_name: postgres-db
    restart: always
    ports:
      - "5433:5432"
    env_file:
      - .env
    volumes:
      - postgres_data:/var/lib/postgresql/data


volumes:
  postgres_data:
```

11. Запуск контейнеров docker
```
docker compose up --build
```

12. Остановка и очистка контейнеров docker
```
docker compose down  -v
```

13. Преобразование команд в sql
npm run db:generate

14. Выполнение запросов в DB (миграция бд)
```
npm run db:migrate
```
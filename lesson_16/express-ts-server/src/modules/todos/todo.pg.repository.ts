import { Todo, TodoRepository } from "./todo.entity";
import { db } from "../../db";
import { todos } from "../../db/schema";
import { eq } from "drizzle-orm";

export class TodoPgRepository implements TodoRepository {
  async create(newTodo: {
    title: string;
    content?: string;
    userId: string;
  }): Promise<Todo> {
    const [todo] = await db.insert(todos).values(newTodo).returning();

    return todo;
  }

  async findAll(): Promise<Todo[]> {
    return db.select().from(todos);
  }

  async findById(id: string): Promise<Todo | null> {
    const [todo] = await db
      .select()
      .from(todos)
      .where(eq(todos.id, id))
      .limit(1);

    return todo ?? null;
  }

  async delete(id: string): Promise<Todo | null> {
    const [todo] = await db.delete(todos).where(eq(todos.id, id)).returning();

    return todo ?? null;
  }

  async update(
    id: string,
    data: { title?: string; content?: string },
  ): Promise<Todo | null> {
    const [todo] = await db
      .update(todos)
      .set(data)
      .where(eq(todos.id, id))
      .returning();

    return todo;
  }
}

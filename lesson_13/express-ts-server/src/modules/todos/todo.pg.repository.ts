import {Todo, TodoRepository} from "./todo.entity";
import {db} from "../../db";
import { todos } from "../../db/schema"

export class TodoPgRepository implements TodoRepository {
    async create(title: string): Promise<Todo> {
        const [todo] = await db
            .insert(todos)
            .values({ title })
            .returning();

        return todo;
    }

    async findAll(): Promise<Todo[]> {
        return db.select().from(todos);
    }
}

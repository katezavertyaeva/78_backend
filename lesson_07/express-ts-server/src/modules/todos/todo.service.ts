// Содержит бизнес логику
// Не работает с req res и express

import { Todo, TodoRepository } from "./todo.entity";

export class TodoService {
  constructor(private readonly repo: TodoRepository) {
    this.repo = repo;
  }

  getAll(): Promise<Todo[]> {
    return this.repo.findAll();
  }

  create(title: string) {
    if (!title) {
      throw new Error("Title is requires");
    }

    return this.repo.create(title);
  }
}

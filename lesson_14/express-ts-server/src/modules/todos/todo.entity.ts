// Описание сущности (типизация) и интерфейс для
// репозитория (описание методов, которые мы можем использовать для
// этой сущности)

export interface Todo {
  id: string;
  title: string;
  content: string | null;
  userId: string;
  done: boolean;
  createdAt: Date;
}

// Интерфейс для репозитория
export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  create(todo: {
    title: string;
    content?: string;
    userId: string;
  }): Promise<Todo>;
  delete(id: string): Promise<Todo | null>;
  findById(id: string): Promise<Todo | null>;
}

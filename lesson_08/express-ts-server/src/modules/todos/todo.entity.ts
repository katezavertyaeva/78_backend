// Описание сущности (типизация) и интерфейс для
// репозитория (описание методов, которые мы можем использовать для
// этой сущности)

export interface Todo {
  id: string;
  title: string;
  done: boolean;
  createdAt: Date;
}

// Интерфейс для репозитория
export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  create(title: string): Promise<Todo>;
}

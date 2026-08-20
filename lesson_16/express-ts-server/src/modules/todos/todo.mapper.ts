import { Todo } from "./todo.entity";
import { TodoResponseDto } from "./todo.response.dto";

export default function toTodoDtoResponse(todo: Todo): TodoResponseDto {
  return {
    id: todo.id,
    title: todo.title,
    content: todo.content ?? "",
    done: todo.done,
    createdAt: todo.createdAt.toISOString(),
  };
}

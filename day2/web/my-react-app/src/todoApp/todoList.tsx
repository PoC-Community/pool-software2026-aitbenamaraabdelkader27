import type { Todo } from "../types/todo";
import { TodoItem } from "../todoApp/todoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;

};

export function TodoList({ todos, onToggle, onDelete, onEdit }: Props) {
  if (todos.length === 0) return <p style={{ color: "#666" }}>No tasks.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </ul>
  );
}

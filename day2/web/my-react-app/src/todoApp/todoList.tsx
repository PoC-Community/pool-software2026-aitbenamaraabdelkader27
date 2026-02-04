import type { Todo } from "../types/todo";
import { TodoItem } from "./todoItem";

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
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

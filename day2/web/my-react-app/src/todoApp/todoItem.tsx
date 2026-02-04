import { useState } from "react";
import type { Todo } from "../types/todo";

type Props = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;

};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);

  function startEdit() {
    setDraft(todo.text);
    setEditing(true);
  }

  function commit() {
    onEdit(todo.id, draft);
    setEditing(false);
  }

  function cancel() {
    setDraft(todo.text);
    setEditing(false);
  }

  return (
    <li
      style={{
        border: "1px solid #e6e6e6",
        borderRadius: 10,
        padding: 10,
        background: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
        <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id)} />

        {!editing ? (
          <span
            onDoubleClick={startEdit}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#777" : "#111",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              cursor: "default",
              flex: 1,
            }}
            title="Double-click to edit"
          >
            {todo.text}
          </span>
        ) : (
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") cancel();
            }}
            style={{ flex: 1, padding: 6, borderRadius: 8, border: "1px solid #ddd" }}
          />
        )}
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        style={{ border: "1px solid #ddd", borderRadius: 8, padding: "6px 10px", cursor: "pointer" }}
      >
        Delete
      </button>
    </li>
  );
}

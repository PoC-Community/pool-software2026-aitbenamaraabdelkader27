import { useMemo, useState } from "react";
import type { Filter, Todo } from "../types/todo";
import { useLocalStorage } from "../storage/useLocalStorage";
import { TodoForm } from "./todoForm";
import { TodoList } from "./todoList";
import { TodoFilter } from "./todoFilter";
import { TodoStats } from "./todoStats";

const STORAGE_KEY = "day2_todos_v1";

function uid() {
  return crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());
}

export function TodoApp() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);
  const [filter, setFilter] = useState<Filter>("all");

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  function addTodo(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos([{ id: uid(), text: trimmed, completed: false }, ...todos]);
  }

  function toggleTodo(id: string) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  function editTodo(id: string, newText: string) {
    const trimmed = newText.trim();
    if (!trimmed) return; 
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
  }

  function clearCompleted() {
    setTodos(todos.filter((t) => !t.completed));
  }

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <TodoForm onAdd={addTodo} />
      <TodoFilter value={filter} onChange={setFilter} onClearCompleted={clearCompleted} />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      <TodoStats remaining={remaining} total={todos.length} />
    </section>
  );
}

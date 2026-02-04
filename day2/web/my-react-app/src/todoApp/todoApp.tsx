import { useEffect, useMemo, useState } from "react";
import type { Filter, Todo } from "../types/todo";
import { TodoForm } from "./todoForm";
import { TodoList } from "./todoList";
import { TodoFilter } from "./todoFilter";
import { TodoStats } from "./todoStats";
import { apiCreateTask, apiDeleteTask, apiListTasks, apiUpdateTask } from "../api/todoApi";

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [error, setError] = useState<string | null>(null);

  // Load initial tasks from backend
  useEffect(() => {
    (async () => {
      try {
        setError(null);
        const tasks = await apiListTasks();
        // API -> UI
        setTodos(tasks.map(t => ({ id: t.id, text: t.title, completed: t.completed })));
      } catch (e: any) {
        setError(e.message || "Failed to load tasks");
      }
    })();
  }, []);

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const remaining = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

  async function addTodo(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      setError(null);
      const created = await apiCreateTask(trimmed);
      setTodos([{ id: created.id, text: created.title, completed: created.completed }, ...todos]);
    } catch (e: any) {
      setError(e.message || "Create failed");
    }
  }

  async function toggleTodo(id: number) {
    const current = todos.find(t => t.id === id);
    if (!current) return;

    try {
      setError(null);
      const updated = await apiUpdateTask(id, { completed: !current.completed });
      setTodos(todos.map(t => (t.id === id ? { id: updated.id, text: updated.title, completed: updated.completed } : t)));
    } catch (e: any) {
      setError(e.message || "Update failed");
    }
  }

  async function deleteTodo(id: number) {
    try {
      setError(null);
      await apiDeleteTask(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (e: any) {
      setError(e.message || "Delete failed");
    }
  }

  async function editTodo(id: number, newText: string) {
    const trimmed = newText.trim();
    if (!trimmed) return;

    try {
      setError(null);
      const updated = await apiUpdateTask(id, { title: trimmed });
      setTodos(todos.map(t => (t.id === id ? { id: updated.id, text: updated.title, completed: updated.completed } : t)));
    } catch (e: any) {
      setError(e.message || "Edit failed");
    }
  }

  async function clearCompleted() {
    // simple: on delete une par une
    const toDelete = todos.filter(t => t.completed);

    try {
      setError(null);
      for (const t of toDelete) {
        await apiDeleteTask(t.id);
      }
      setTodos(todos.filter(t => !t.completed));
    } catch (e: any) {
      setError(e.message || "Clear completed failed");
    }
  }

  return (
    <section style={{ display: "grid", gap: 12 }}>
      {error && <p style={{ color: "crimson", margin: 0 }}>Error: {error}</p>}

      <TodoForm onAdd={addTodo} />
      <TodoFilter value={filter} onChange={setFilter} onClearCompleted={clearCompleted} />
      <TodoList todos={visibleTodos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      <TodoStats remaining={remaining} total={todos.length} />
    </section>
  );
}

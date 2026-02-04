import { useState } from "react";
import { Button } from "../components/Button";

type Props = {
  onAdd: (text: string) => void;
};

export function TodoForm({ onAdd }: Props) {
  const [text, setText] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        style={{ flex: 1, padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
      />
      <button type="submit" disabled={text.trim().length === 0}>
        Add
      </button>
    </form>
  );
}

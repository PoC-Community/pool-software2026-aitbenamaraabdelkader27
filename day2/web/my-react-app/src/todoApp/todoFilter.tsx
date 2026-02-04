import type { Filter } from "../types/todo";
import { Button } from "../components/Button";

type Props = {
  value: Filter;
  onChange: (f: Filter) => void;
  onClearCompleted: () => void;
};

export function TodoFilter({ value, onChange, onClearCompleted }: Props) {
  const btnStyle = (active: boolean) => ({
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid #ddd",
    background: active ? "#111" : "#fff",
    color: active ? "#fff" : "#111",
    cursor: "pointer",
  });

  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button style={btnStyle(value === "all")} onClick={() => onChange("all")} type="button">
          All
        </button>
        <button style={btnStyle(value === "active")} onClick={() => onChange("active")} type="button">
          Active
        </button>
        <button
          style={btnStyle(value === "completed")}
          onClick={() => onChange("completed")}
          type="button"
        >
          Completed
        </button>
      </div>

      <Button onClick={onClearCompleted}>Clear completed</Button>
    </div>
  );
}

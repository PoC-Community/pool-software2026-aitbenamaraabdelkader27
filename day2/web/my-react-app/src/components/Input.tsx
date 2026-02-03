import { useState } from "react";
import { Button } from "./Button";

export function LiveInput() {
  const [value, setValue] = useState<string>("");

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type here..."
        style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Text: {value || "(empty)"}</span>
        <span>Chars: {value.length}</span>
      </div>
      <Button onClick={() => setValue("")} disabled={value.length === 0}>
        Clear
      </Button>
      
    </div>
  );
}

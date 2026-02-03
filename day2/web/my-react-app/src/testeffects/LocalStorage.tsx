import { useEffect, useState } from "react";

export function LocalStorageDemo() {
  const [name, setName] = useState(() => {
    return localStorage.getItem("name") ?? "";
  });

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <p>Hello {name || "stranger"} </p>
    </div>
  );
}

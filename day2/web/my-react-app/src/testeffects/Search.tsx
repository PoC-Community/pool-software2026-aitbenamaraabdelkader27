import { useEffect, useState } from "react";

const DATA = ["React", "Vue", "Angular", "Svelte", "Solid"];

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>(DATA);

  useEffect(() => {
    const id = setTimeout(() => {
      const filtered = DATA.filter((item) =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  return (
    <div>
      <input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {results.length === 0 && <li>No results</li>}
        {results.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

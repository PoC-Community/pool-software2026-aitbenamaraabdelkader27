import { useState } from "react";

function toF(c: number) {
  return (c * 9) / 5 + 32;
}

function toC(f: number) {
  return ((f - 32) * 5) / 9;
}

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState<string>("");

  const c = Number(celsius);
  const fahrenheit = celsius.trim() === "" || Number.isNaN(c) ? "" : String(Math.round(toF(c)));

  function onCelsiusChange(value: string) {
    setCelsius(value);
  }

  function onFahrenheitChange(value: string) {
    const f = Number(value);
    if (value.trim() === "" || Number.isNaN(f)) {
      setCelsius("");
      return;
    }
    setCelsius(String(Math.round(toC(f))));
  }

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <label>
        Celsius:
        <input
          value={celsius}
          onChange={(e) => onCelsiusChange(e.target.value)}
          placeholder="e.g. 20"
        />
      </label>

      <label>
        Fahrenheit:
        <input
          value={fahrenheit}
          onChange={(e) => onFahrenheitChange(e.target.value)}
          placeholder="e.g. 68"
        />
      </label>

      <p style={{ color: "#666" }}>
        On utilise un seul état pour que les deux champs restent synchronisés.
      </p>
    </div>
  );
}

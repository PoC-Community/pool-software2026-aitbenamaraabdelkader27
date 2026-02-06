import { useEffect, useState } from "react";
import { apiLogin, apiRegister } from "../api/authApi";

const TOKEN_KEY = "token";

export function AuthBox(props: { onAuthChange?: () => void }) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState<string>(localStorage.getItem(TOKEN_KEY) || "");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
   
    setToken(localStorage.getItem(TOKEN_KEY) || "");
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);

    try {
      if (mode === "register") {
        await apiRegister(email, password, name || undefined);
        setInfo("Account created. Now login.");
        setMode("login");
        return;
      }

      const res = await apiLogin(email, password);
      localStorage.setItem(TOKEN_KEY, res.token);
      setToken(res.token);
      setInfo(`Logged in as ${res.user.email}`);
      props.onAuthChange?.();
    } catch (e: any) {
      setError(e.message || "Auth failed");
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setInfo("Logged out.");
    props.onAuthChange?.();
  }

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
        <strong>Auth</strong>
        <button type="button" onClick={() => setMode("login")} disabled={mode === "login"}>
          Login
        </button>
        <button type="button" onClick={() => setMode("register")} disabled={mode === "register"}>
          Register
        </button>

        {token && (
          <button type="button" onClick={logout} style={{ marginLeft: "auto" }}>
            Logout
          </button>
        )}
      </div>

      {error && <p style={{ color: "crimson", margin: 0 }}>Error: {error}</p>}
      {info && <p style={{ color: "green", margin: 0 }}>{info}</p>}

      {!token ? (
        <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
          {mode === "register" && (
            <input
              placeholder="name (optional)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
            />
          )}

          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }}
          />

          <button type="submit">{mode === "login" ? "Login" : "Create account"}</button>
        </form>
      ) : (
        <p style={{ margin: 0, color: "#444" }}>Token stored ✅ (localStorage: {TOKEN_KEY})</p>
      )}
    </div>
  );
}

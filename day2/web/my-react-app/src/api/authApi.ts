const API_URL = "http://localhost:3000";

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let data: any = null;
    try { data = await res.json(); } catch {}
    throw new Error(data?.error || `HTTP ${res.status}`);
  }

  return res.json();
}

export function apiRegister(email: string, password: string, name?: string) {
  return request("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  }) as Promise<{ id: number; email: string; name?: string }>;
}

export function apiLogin(email: string, password: string) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }) as Promise<{ token: string; user: { id: number; email: string; name?: string } }>;
}

const API_URL = "http://localhost:3000";
const TOKEN_KEY = "token";

function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  // erreurs JSON standardisées du backend
  if (!res.ok) {
    let data: any = null;
    try { data = await res.json(); } catch {}
    const msg = data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return res.json();
}

export type ApiTask = {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

export function apiListTasks() {
  return request("/api/tasks") as Promise<ApiTask[]>;
}

export function apiCreateTask(title: string) {
  return request("/api/tasks", {
    method: "POST",
    body: JSON.stringify({ title }),
  }) as Promise<ApiTask>;
}

export function apiUpdateTask(id: number, patch: { title?: string; completed?: boolean }) {
  return request(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(patch),
  }) as Promise<ApiTask>;
}

export function apiDeleteTask(id: number) {
  return request(`/api/tasks/${id}`, { method: "DELETE" }) as Promise<{ message: string }>;
}

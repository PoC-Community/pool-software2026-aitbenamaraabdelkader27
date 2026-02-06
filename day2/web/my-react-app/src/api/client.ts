const API_URL = "http://localhost:3000";

function getToken() {
  return localStorage.getItem("token"); 
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const msg = data?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}

export const api = {
  
  register: (email: string, password: string, name?: string) =>
    request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    }),

  login: async (email: string, password: string) => {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    
    localStorage.setItem("token", data.token);
    return data;
  },

  me: () => request("/api/auth/me"),

  listTasks: () => request("/api/tasks"),
  createTask: (title: string) =>
    request("/api/tasks", { method: "POST", body: JSON.stringify({ title }) }),
  updateTask: (id: number, patch: { title?: string; completed?: boolean }) =>
    request(`/api/tasks/${id}`, { method: "PUT", body: JSON.stringify(patch) }),
  deleteTask: (id: number) => request(`/api/tasks/${id}`, { method: "DELETE" }),
};

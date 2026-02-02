type ID = string | number;

interface User {
  id: ID;
  name: string;
  city?: string;
}

const user: User = { id: 1, name: "Kader", city: "Paris" };

function greet(u: User): string {
  return `Hello, ${u.name}!`;
}

const out = document.querySelector("#out") as HTMLParagraphElement | null;
const btn = document.querySelector("#btn") as HTMLButtonElement | null;

if (!out || !btn) {
  throw new Error("Missing DOM elements");
}

out.textContent = greet(user);

btn.addEventListener("click", (e: MouseEvent) => {
  const target = e.currentTarget as HTMLButtonElement;
  target.disabled = true;
  out.textContent = "Button clicked (typed event) ";
});

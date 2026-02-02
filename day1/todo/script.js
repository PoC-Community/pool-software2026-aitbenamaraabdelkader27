const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");

let todos = loadTodos();

function saveTodos() {
  localStorage.setItem("e-todo", JSON.stringify(todos));
}

function loadTodos() {
  const data = localStorage.getItem("e-todo");
  return data ? JSON.parse(data) : [];
}

function renderTodos() {
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "item" + (todo.completed ? " completed" : "");

    const text = document.createElement("span");
    text.textContent = todo.text;
    text.addEventListener("click", () => toggleTodo(index));

    const del = document.createElement("button");
    del.textContent = "✕";
    del.className = "delete";
    del.addEventListener("click", () => deleteTodo(index));

    li.appendChild(text);
    li.appendChild(del);
    list.appendChild(li);
  });

  counter.textContent = `${todos.length} task${todos.length !== 1 ? "s" : ""}`;
}

function addTodo(text) {
  if (!text.trim()) return;

  todos.push({
    text,
    completed: false,
  });

  saveTodos();
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo(input.value);
  input.value = "";
});

renderTodos();

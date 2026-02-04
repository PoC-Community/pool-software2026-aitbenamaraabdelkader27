const { error, toBool } = require("../utils/helpers");

// In-memory tasks
let tasks = [];
let nextTaskId = 1;

function parseId(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    error(res, 400, "Invalid task id");
    return null;
  }
  return id;
}

function list(req, res) {
  const userId = req.user.id;
  let result = tasks.filter(t => t.userId === userId);

  // Filters (Step 4.1)
  const completed = toBool(String(req.query.completed ?? ""));
  if (completed !== null) result = result.filter(t => t.completed === completed);

  // Sorting
  const sortBy = (req.query.sortBy || "").toString();
  const order = (req.query.order || "asc").toString().toLowerCase();

  if (sortBy === "createdAt" || sortBy === "title") {
    result.sort((a, b) => {
      const va = a[sortBy];
      const vb = b[sortBy];
      if (va < vb) return order === "desc" ? 1 : -1;
      if (va > vb) return order === "desc" ? -1 : 1;
      return 0;
    });
  }

  // Pagination
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : undefined;
  const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;

  if ((limit !== undefined && Number.isNaN(limit)) || Number.isNaN(offset)) {
    return error(res, 400, "Invalid limit/offset");
  }

  if (limit !== undefined) result = result.slice(offset, offset + limit);
  else result = result.slice(offset);

  return res.json(result);
}

function getOne(req, res) {
  const id = parseId(req, res);
  if (id === null) return;

  const userId = req.user.id;
  const task = tasks.find(t => t.id === id && t.userId === userId);
  if (!task) return error(res, 404, "Task not found");

  return res.json(task);
}

function create(req, res) {
  const now = new Date().toISOString();

  const newTask = {
    id: nextTaskId++,
    userId: req.user.id,
    title: req.body.title.trim(),
    completed: false,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
}

function update(req, res) {
  const id = parseId(req, res);
  if (id === null) return;

  const userId = req.user.id;
  const task = tasks.find(t => t.id === id && t.userId === userId);
  if (!task) return error(res, 404, "Task not found");

  const { title, completed } = req.body;

  if (title !== undefined) task.title = title.trim();
  if (completed !== undefined) task.completed = completed;

  task.updatedAt = new Date().toISOString();
  return res.json(task);
}

function remove(req, res) {
  const id = parseId(req, res);
  if (id === null) return;

  const userId = req.user.id;
  const index = tasks.findIndex(t => t.id === id && t.userId === userId);
  if (index === -1) return error(res, 404, "Task not found");

  tasks.splice(index, 1);
  return res.json({ message: "Task deleted" });
}

// Search (Step 4.2)
function search(req, res) {
  const userId = req.user.id;
  const q = (req.query.q || "").toString().toLowerCase();

  const result = tasks
    .filter(t => t.userId === userId)
    .filter(t => t.title.toLowerCase().includes(q));

  return res.json(result);
}

// Stats (Step 4.3)
function stats(req, res) {
  const userId = req.user.id;
  const myTasks = tasks.filter(t => t.userId === userId);

  const total = myTasks.length;
  const completed = myTasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  return res.json({ total, completed, pending, completionPercentage: percent });
}

module.exports = { list, getOne, create, update, remove, search, stats };

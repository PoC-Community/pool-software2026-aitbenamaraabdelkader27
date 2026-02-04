const { error, isValidTitle, isValidEmail, isValidPassword } = require("../utils/helpers");

function validateTaskCreate(req, res, next) {
  const { title } = req.body;
  if (!isValidTitle(title)) return error(res, 400, "Invalid title");
  next();
}

function validateTaskUpdate(req, res, next) {
  const { title, completed } = req.body;

  if (title !== undefined && !isValidTitle(title)) return error(res, 400, "Invalid title");
  if (completed !== undefined && typeof completed !== "boolean") return error(res, 400, "Invalid completed");

  next();
}

function validateRegister(req, res, next) {
  const { email, password, name } = req.body;

  if (!isValidEmail(email)) return error(res, 400, "Invalid email");
  if (!isValidPassword(password)) return error(res, 400, "Password must be at least 6 chars");
  if (name !== undefined && typeof name !== "string") return error(res, 400, "Invalid name");

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!isValidEmail(email)) return error(res, 400, "Invalid email");
  if (typeof password !== "string" || password.length === 0) return error(res, 400, "Password required");

  next();
}

module.exports = { validateTaskCreate, validateTaskUpdate, validateRegister, validateLogin };

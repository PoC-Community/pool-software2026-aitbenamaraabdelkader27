function error(res, statusCode, message) {
  return res.status(statusCode).json({ error: message, statusCode });
}

function isValidTitle(title) {
  return typeof title === "string" && title.trim().length > 0 && title.length <= 200;
}

function isValidEmail(email) {
  if (typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return typeof password === "string" && password.length >= 6;
}

function toBool(str) {
  if (str === "true") return true;
  if (str === "false") return false;
  return null;
}

module.exports = { error, isValidTitle, isValidEmail, isValidPassword, toBool };

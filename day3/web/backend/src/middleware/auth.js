const jwt = require("jsonwebtoken");
const { error } = require("../utils/helpers");

function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return error(res, 401, "Missing token");
  }

  const token = header.slice("Bearer ".length);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email, name }
    next();
  } catch {
    return error(res, 401, "Invalid token");
  }
}

module.exports = auth;

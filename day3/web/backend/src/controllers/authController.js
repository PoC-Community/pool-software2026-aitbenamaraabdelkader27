const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error } = require("../utils/helpers");

// In-memory users
let users = [];
let nextUserId = 1;

function register(req, res) {
  const { email, password, name } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) return error(res, 400, "Email already used");

  const passwordHash = bcrypt.hashSync(password, 10);

  const user = {
    id: nextUserId++,
    email,
    passwordHash,
    name: name || "User"
  };

  users.push(user);

  return res.status(201).json({ id: user.id, email: user.email, name: user.name });
}

function login(req, res) {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return error(res, 401, "Invalid credentials");

  const ok = bcrypt.compareSync(password, user.passwordHash);
  if (!ok) return error(res, 401, "Invalid credentials");

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.json({
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
}

function me(req, res) {
  return res.json({ id: req.user.id, email: req.user.email, name: req.user.name });
}

module.exports = { register, login, me };

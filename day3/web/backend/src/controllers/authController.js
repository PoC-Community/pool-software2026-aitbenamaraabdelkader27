const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const { error } = require("../utils/helpers");

async function register(req, res) {
  try {
    const { email, password, name } = req.body;

    // déjà validé par middleware normalement, mais sécurité
    if (!email || !password) return error(res, 400, "Missing fields");

    // check email unique
    const exists = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (exists.rows.length > 0) return error(res, 400, "Email already used");

    const passwordHash = bcrypt.hashSync(password, 10);

    const result = await pool.query(
      `INSERT INTO users (email, password_hash, name)
       VALUES ($1, $2, $3)
       RETURNING id, email, name`,
      [email, passwordHash, name || "User"]
    );

    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT id, email, name, password_hash FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) return error(res, 401, "Invalid credentials");

    const user = result.rows[0];

    const ok = bcrypt.compareSync(password, user.password_hash);
    if (!ok) return error(res, 401, "Invalid credentials");

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function me(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, email, name FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) return error(res, 404, "User not found");
    return res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

module.exports = { register, login, me };

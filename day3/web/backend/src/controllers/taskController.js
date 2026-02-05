const pool = require("../db");
const { error, toBool } = require("../utils/helpers");

function parseId(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    error(res, 400, "Invalid task id");
    return null;
  }
  return id;
}

function parseLimitOffset(req, res) {
  const limit = req.query.limit !== undefined ? Number(req.query.limit) : undefined;
  const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;

  if ((limit !== undefined && Number.isNaN(limit)) || Number.isNaN(offset)) {
    error(res, 400, "Invalid limit/offset");
    return null;
  }

  return { limit, offset };
}

async function list(req, res) {
  try {
    const userId = req.user.id;

    const completed = toBool(String(req.query.completed ?? ""));
    const sortBy = (req.query.sortBy || "").toString();
    const order = (req.query.order || "asc").toString().toLowerCase() === "desc" ? "DESC" : "ASC";

    const page = parseLimitOffset(req, res);
    if (!page) return;

    // whitelists anti injection
    const sortColumn =
      sortBy === "createdAt" ? "created_at" :
      sortBy === "title" ? "title" :
      null;

    const where = ["user_id = $1"];
    const params = [userId];
    let p = 2;

    if (completed !== null) {
      where.push(`completed = $${p}`);
      params.push(completed);
      p++;
    }

    let sql = `SELECT id, user_id AS "userId", title, completed,
                      created_at AS "createdAt", updated_at AS "updatedAt"
               FROM tasks
               WHERE ${where.join(" AND ")}`;

    if (sortColumn) sql += ` ORDER BY ${sortColumn} ${order}`;
    else sql += ` ORDER BY created_at DESC`;

    if (page.limit !== undefined) {
      sql += ` LIMIT $${p}`;
      params.push(page.limit);
      p++;
    }

    sql += ` OFFSET $${p}`;
    params.push(page.offset);

    const result = await pool.query(sql, params);
    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function getOne(req, res) {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const userId = req.user.id;

    const result = await pool.query(
      `SELECT id, user_id AS "userId", title, completed,
              created_at AS "createdAt", updated_at AS "updatedAt"
       FROM tasks
       WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (result.rows.length === 0) return error(res, 404, "Task not found");
    return res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function create(req, res) {
  try {
    const userId = req.user.id;
    const title = req.body.title.trim();

    const result = await pool.query(
      `INSERT INTO tasks (user_id, title, completed)
       VALUES ($1, $2, false)
       RETURNING id, user_id AS "userId", title, completed,
                 created_at AS "createdAt", updated_at AS "updatedAt"`,
      [userId, title]
    );

    return res.status(201).json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function update(req, res) {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const userId = req.user.id;
    const { title, completed } = req.body;

    // build patch dynamique
    const sets = [];
    const params = [];
    let p = 1;

    if (title !== undefined) {
      sets.push(`title = $${p++}`);
      params.push(title.trim());
    }

    if (completed !== undefined) {
      sets.push(`completed = $${p++}`);
      params.push(completed);
    }

    if (sets.length === 0) return error(res, 400, "Nothing to update");

    sets.push(`updated_at = NOW()`);

    params.push(id);      // $p
    params.push(userId);  // $(p+1)

    const sql = `
      UPDATE tasks
      SET ${sets.join(", ")}
      WHERE id = $${p++} AND user_id = $${p}
      RETURNING id, user_id AS "userId", title, completed,
                created_at AS "createdAt", updated_at AS "updatedAt"
    `;

    const result = await pool.query(sql, params);

    if (result.rows.length === 0) return error(res, 404, "Task not found");
    return res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function remove(req, res) {
  try {
    const id = parseId(req, res);
    if (id === null) return;

    const userId = req.user.id;

    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id",
      [id, userId]
    );

    if (result.rows.length === 0) return error(res, 404, "Task not found");
    return res.json({ message: "Task deleted" });
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function search(req, res) {
  try {
    const userId = req.user.id;
    const q = (req.query.q || "").toString();

    const result = await pool.query(
      `SELECT id, user_id AS "userId", title, completed,
              created_at AS "createdAt", updated_at AS "updatedAt"
       FROM tasks
       WHERE user_id = $1 AND title ILIKE $2
       ORDER BY created_at DESC`,
      [userId, `%${q}%`]
    );

    return res.json(result.rows);
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

async function stats(req, res) {
  try {
    const userId = req.user.id;

    const totalRes = await pool.query("SELECT COUNT(*)::int AS total FROM tasks WHERE user_id = $1", [userId]);
    const completedRes = await pool.query(
      "SELECT COUNT(*)::int AS completed FROM tasks WHERE user_id = $1 AND completed = true",
      [userId]
    );

    const total = totalRes.rows[0].total;
    const completed = completedRes.rows[0].completed;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    return res.json({ total, completed, pending, completionPercentage: percent });
  } catch (e) {
    console.error(e);
    return error(res, 500, "Server error");
  }
}

module.exports = { list, getOne, create, update, remove, search, stats };

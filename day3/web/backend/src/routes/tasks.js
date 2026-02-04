const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { validateTaskCreate, validateTaskUpdate } = require("../middleware/validation");
const { list, getOne, create, update, remove, search, stats } = require("../controllers/taskController");

router.use(auth);

router.get("/", list);
router.get("/search", search);
router.get("/stats", stats);

router.get("/:id", getOne);
router.post("/", validateTaskCreate, create);
router.put("/:id", validateTaskUpdate, update);
router.delete("/:id", remove);

module.exports = router;

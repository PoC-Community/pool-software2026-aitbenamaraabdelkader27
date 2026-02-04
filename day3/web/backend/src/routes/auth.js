const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validation");
const { register, login, me } = require("../controllers/authController");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", auth, me);

module.exports = router;

const express = require("express");
const { register, login, getUser } = require("../controller/authController");
const authenticateMiddleware = require("../middleware/authenticateMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateMiddleware, getUser);

module.exports = router;

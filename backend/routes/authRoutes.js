const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

// 🔐 AUTH ROUTES
router.post("/register", register);
router.post("/login", login);

// 🔥 OPTIONAL: check route (for testing auth)
router.get("/me", (req, res) => {
  res.json({ message: "Auth route working ✅" });
});

module.exports = router;
const express = require("express");
const router = express.Router();
const jwtHelper = require("../helpers/jwtHelper");
const { checkAuth } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/profile", checkAuth, authController.getProfileUser);

module.exports = router;

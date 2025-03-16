const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//create user (C)
router.post("/", userController.createUser);

//get user by id (R)
router.get("/:id", userController.getUserById);

//get all users (R)
router.get("/", userController.getAllUsers);

//update user by id (U)
router.put("/:id", userController.updateUserById);

//delete user by id (D)
router.delete("/:id", userController.deleteUserById);

module.exports = router;

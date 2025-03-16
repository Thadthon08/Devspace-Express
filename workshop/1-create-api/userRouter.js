const express = require("express");

const userRouter = express.Router();
userRouter.get("/3", (req, res) => {
  const users = { id: 3, name: "Bob" };
  res.json(users);
});

module.exports = userRouter;

//express router
const express = require("express");

//create router module users
const userRouter = require("./userRouter");

//app main
const app = express();
app.use("/api/users", userRouter); //api/users/2

app.listen(3000, () => {
  console.log("api run on http://localhost:3000");
});

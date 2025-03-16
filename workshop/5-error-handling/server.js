const express = require("express");
const app = express();

//middleware
app.use((req, res, next) => {
  //process...
  //   throw new Error("Error from middleware");
  const error = new Error("Error from middleware");
  error.status = 429;
  //   next(error);
  next();
});

//api
app.get("/api/error", (req, res) => {
  //process....
  const error = new Error("Error from api");
  error.status = 501;
  throw error;
});

//===============>
// error handler middleware
//===============>
//error client
app.use((req, res, next) => {
  res.status(401);
  const data = {
    message: "Unauthorized",
    status: 401,
  };
  res.json(data);
});

app.use((req, res, next) => {
  res.status(403);
  const data = {
    message: "Forbidden",
    status: 403,
  };
  res.json(data);
});

app.use((req, res, next) => {
  res.status(404);
  const data = {
    message: "Not Found",
    status: 404,
  };
  res.json(data);
});

//error server
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const data = {
    message: "Internal Server Error",
    status: error.status,
  };
  res.json(data);
});

//server
app.listen(3000, () => console.log("server run on http://localhost:3000"));

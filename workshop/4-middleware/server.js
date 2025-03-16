const express = require("express");
const app = express(); //app mail

//===================>
// MIDDLEWARE EXAMPLE
//===================>
//middleware 1
/*
app.use((req, res, next) => {
  res.on("finish", () => console.log("middleware 1 done"));

  console.log("middleware 1");
  req.msg = "HELLO WORLD";
  next();
});

//middleware 2
app.use((req, res, next) => {
  res.on("finish", () => console.log("middleware 2 done"));

  console.log("middleware 2");
  req.msg = "HELLO DEVVSPACCE";
  next();
});

const cbMiddleware = (req, res, next) => {
  res.on("finish", () => console.log("middleware 3 done"));

  console.log("middleware 3 (METHOD)");
  req.msg = "HELLO SARAH";
  next();
};
app.get("/api/hello", cbMiddleware, (req, res) => {
  res.send(req.msg);
});
*/

//===================>
// LEVEL OF MIDDLEWARE
//===================>
/*
//app level middleware
app.use((req, res, next) => {
  console.log("app level middleware");
  next();
});
app.get("/api/middleware/1", (req, res) => {
  res.send("app level middleware");
});

//routes level middleware
const productRouter = express.Router();
productRouter.use((req, res, next) => {
  console.log("productRouter level middleware");
  next();
});
productRouter.get("/middleware/2", (req, res) => {
  res.send("productRouter level middleware");
});

const orderRouter = express.Router();
orderRouter.use((req, res, next) => {
  console.log("orderRouter level middleware");
  next();
});
orderRouter.get("/middleware/2", (req, res) => {
  res.send("orderRouter level middleware");
});

//bind router
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
*/

//===================>
// USE CASE MIDDLEWARE
//===================>
//use case1: middleware สำเร็จรูป
const morgan = require("morgan");
app.use(morgan("dev"));

app.get("/api/middleware/1", (req, res) => {
  res.send("middleware 1");
});

app.get("/api/middleware/2", (req, res) => {
  res.send("middleware 2");
});

//use case1: validate middleware
const validateProduct = (req, res, next) => {
  const { name, course, price } = req.body;
  if (!name || !course || !price) {
    return res.status(400).send("Invalid data");
  }
  if (price < 0) {
    return res.status(400).send("price must be greater than 0");
  }
  if (typeof price !== "number")
    return res.status(400).send("price must be a number");

  next();
};
app.use(express.json());
app.post("/api/middleware/2", validateProduct, (req, res) => {
  const data = req.body;
  res.send(data);
});

app.listen(3000, () => console.log("api run on http://localhost:3000")); //app listen

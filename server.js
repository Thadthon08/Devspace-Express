//รวมข้อมูล api ต่างๆ ในไฟล์เดียว
const express = require("express");

//env config file
const path = `.env.${process.env.NODE_ENV}`;
require("dotenv").config({ path: path });

const { checkAuth } = require("./middleware/authMiddleware");
const helloRoutes = require("./routes/helloRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();

// const sequelize = require("./models/db");

app.use(express.json());

app.use("/api/hello", checkAuth, helloRoutes);
app.use("/api/products", checkAuth, productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", checkAuth, userRoutes);

//error server
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  const data = {
    message: error.message,
    status: error.status,
  };
  res.json(data);
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

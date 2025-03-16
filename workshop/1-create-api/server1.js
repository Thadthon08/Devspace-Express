//express
const express = require("express");
const app = express();

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.json(users);
});

app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
  ];
  res.json(products);
});

app.listen(3000, () => {
  console.log("api run on http://localhost:3000");
});

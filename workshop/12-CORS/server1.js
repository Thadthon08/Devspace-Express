const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3002" }));

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ]);
});

app.listen(3000, () => console.log("Server started on http://localhost:3000"));

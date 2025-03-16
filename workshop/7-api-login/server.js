const express = require("express");
const app = express();
const jwtHelper = require("../../helpers/jwtHelper");
const { checkAuth } = require("../../middleware/authMiddleware");

//middleware
app.use(express.json());

//api login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body; //json

  if (username === "devvspacce" && password === "pw_devvspacce123") {
    const token = jwtHelper.createJwt({ username });
    return res.json({ token });
  }

  res.json({ username, password });
});

//api get profile
app.get("/api/profile", checkAuth, (req, res) => {
  const username = req.user.username;
  res.send(`ยินดีต้อนรับ ${username} เข้าสู่ระบบของเรา`);
});

app.listen(3000, () => console.log("api run on http://localhost:3000"));

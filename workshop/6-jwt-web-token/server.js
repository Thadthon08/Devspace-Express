const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(8).toString("hex"); //กุญแจสำหรับเข้ารหัส

const app = express();
app.use(express.json());

const createJwt = (payload) => {
  const token = jwt.sign(payload, secretKey, {
    algorithm: "HS256",
    expiresIn: "1m",
  });
  return token;
};

const verifyJwt = (token) => {
  try {
    const payload = jwt.verify(token, secretKey);
    return { payload, isValid: true };
  } catch (error) {
    return { payload: null, isValid: false };
  }
};

app.post("/api/createJwt", (req, res) => {
  const payload = req.body;
  const token = createJwt(payload);
  res.send({
    secretKey,
    token,
  });
});

app.get("/api/decodeJwt", (req, res) => {
  const barerToken = req.headers.authorization;
  const token = barerToken.split(" ")[1];
  const { payload, isValid } = verifyJwt(token);
  if (!isValid) return res.status(401).send("Unauthorized");
  res.json({ payload, isValid });
});

app.listen(3000, () =>
  console.log("Server running on port http://localhost:3000")
);

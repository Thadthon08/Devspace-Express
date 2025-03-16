const jwt = require("jsonwebtoken");
const secretKey = "#devv&spacc$e1234";

const createJwt = (payload) => {
  const token = jwt.sign(payload, secretKey, {
    algorithm: "HS256",
    expiresIn: "1h",
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

module.exports = { createJwt, verifyJwt };

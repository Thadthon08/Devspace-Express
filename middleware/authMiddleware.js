const jwtHelper = require("../helpers/jwtHelper");

const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  const token = auth && auth.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: "ไม่พบ Token !!!" });
  const { payload, isValid } = jwtHelper.verifyJwt(token);

  if (!isValid)
    return res
      .status(403)
      .json({ message: "Token ไม่ถูกต้อง หรือ Token หมดอายุ" });

  const { username } = payload;
  req.user = { username, email: "email", phoneNo: "phoneNo" };
  next();
};

module.exports = {
  checkAuth,
};

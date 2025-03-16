const jwtHelper = require("../helpers/jwtHelper");
const User = require("../models/userModal");
const bcrypt = require("bcrypt");
const { sendConfirmEmail } = require("../helpers/sendMailHelper");

const registerUser = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบด้วย !!" });
  }

  const existingUser = await User.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).send("มีชื่อผู้ใช้งานนี้แล้ว");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.createUser(username, email, passwordHash);
  const token = jwtHelper.createJwt(newUser);

  //send email
  sendConfirmEmail(email, username);
  return res.status(201).json({ message: "ลงทะเบียนสำเร็จแล้ว !!!", token });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body; //json

  if (!username || !password) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบด้วย !!" });
  }

  const existingUser = await User.getUserByUsername(username);
  if (!existingUser) {
    return res.status(400).json({ message: "ไม่พบชื่อผู้ใช้งานนี้" });
  }

  const isMatch = await bcrypt.compare(password, existingUser.password);
  const isValidLogin = username === existingUser.username && isMatch;
  if (isValidLogin) {
    const token = jwtHelper.createJwt({
      username: existingUser.username,
      email: existingUser.email,
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "ชื่อผู้ใช้งาน หรือ หัสผ่านไม่ถูกต้อง !!" });
};

const getProfileUser = (req, res) => {
  const username = req.user.username;
  res.send(`ยินดีต้อนรับ ${username} เข้าสู่ระบบของเรา`);
};

module.exports = {
  registerUser,
  loginUser,
  getProfileUser,
};

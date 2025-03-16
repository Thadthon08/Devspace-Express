const User = require("../models/userModal");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  //valid data
  if (!username || !email || !password) {
    return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบด้วย !!" });
  }

  //existing user
  const existingUser = await User.getUserByUsername(username);
  if (existingUser) {
    return res.status(400).json({ message: "มีชื่อผู้ใช้งานนี้แล้ว !!" });
  }

  //create user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.createUser(username, email, hashedPassword);
  if (!newUser) {
    return res.status(500).json({ message: "เกิดข้อผิดพลาดบางอย่าง !!" });
  }

  res.status(201).json({ message: "สร้างผู้ใช้สำเร็จ", user: newUser });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const userId = await User.getUserById(id);
  if (!userId) {
    return res.status(404).json({ message: "ไม่พบผู้ใช้งานนี้ !!" });
  }
  res.send(userId);
};

const getAllUsers = async (req, res) => {
  const allUser = await User.getAllUsers();
  res.send(allUser);
};

const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  //existing user
  const existingUser = await User.getUserById(id);
  if (!existingUser) {
    return res.status(404).json({ message: "ไม่พบผู้ใช้งานนี้ !!" });
  }

  //update data
  const newData = existingUser;
  if (username) newData.username = username;
  if (email) newData.email = email;
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    newData.password = hashedPassword;
  }

  const updateUser = await User.updateUserById(newData);
  if (!updateUser) {
    return res.status(500).json({
      message:
        "ไม่สามารถอัปเดทข้อมูลได้ เนื่องจากเกิดข้อผิดพลาดบางอย่างที่ server !!",
    });
  }

  res.status(200).json({
    message: "อัปเดทข้อมูลสำเร็จ",
    user: updateUser,
  });
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;

  //existing user
  const existingUser = await User.getUserById(id);
  if (!existingUser) {
    return res.status(404).json({ message: "ไม่พบผู้ใช้งานนี้ !!" });
  }

  const deleteUser = await User.deleteUserById(id);
  if (!deleteUser) {
    return res.status(500).json({
      message:
        "ไม่สามารถลบข้อมูลได้ เนื่องจากเกิดข้อผิดพลาดบางอย่างที่ server !!",
    });
  }

  res.status(200).json({
    message: "ลบข้อมูลผู้ใช้สำเร็จ",
    user: {
      id: existingUser.id,
      username: existingUser.username,
      email: existingUser.email,
    },
  });
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};

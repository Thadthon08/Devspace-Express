const sequelize = require("./db");

const getUserByUsername = async (username) => {
  //sql prepared statement
  const sql = `SELECT * FROM users WHERE username = :username`;
  const replacements = { username };

  //execute sql
  const result = await sequelize.query(sql, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
  });
  return result?.length > 0 ? result[0] : null;
};

const createUser = async (username, email, hashedPassword) => {
  //sql prepared statement
  const sql = `INSERT INTO users (username, email, password)
    VALUES (:username, :email, :password)`;
  const replacements = { username, email, password: hashedPassword };

  //execute sql
  const [id, metadata] = await sequelize.query(sql, { replacements });
  if (metadata > 0) return { id, username, email };
  return null;
};

const getUserById = async (id) => {
  //sql prepared statement
  const sql = `SELECT id, username, email FROM users WHERE id = :id`;
  const replacements = { id };

  //execute sql
  const result = await sequelize.query(sql, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
  });

  return result?.length > 0 ? result[0] : null;
};

const getAllUsers = async () => {
  //sql prepared statement
  const sql = `SELECT id, username, email FROM users`;

  //execute sql
  const result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  return result;
};

const updateUserById = async (newData) => {
  const { id, username, email, password } = newData;

  //fields update
  const fieldsUpdate = [];
  if (username) fieldsUpdate.push("username = :username");
  if (email) fieldsUpdate.push("email = :email");
  if (password) fieldsUpdate.push("password = :password");

  const fieldsUpdateStr = fieldsUpdate.join(", ");

  //sql prepared statement
  const sql = `UPDATE users
  SET ${fieldsUpdateStr}
  WHERE id = :id`;
  const replacements = { id, username, email, password };

  //execute sql
  const [_, metadata] = await sequelize.query(sql, { replacements });
  if (metadata?.affectedRows > 0) return { id, username, email };
  return null;
};

const deleteUserById = async (id) => {
  //sql prepared statement
  const sql = `DELETE FROM users
  WHERE id = :id`;
  const replacements = { id };

  //execute sql
  const [_, metadata] = await sequelize.query(sql, { replacements });
  if (metadata?.affectedRows > 0) return { id };
  return null;
};

module.exports = {
  getUserByUsername,
  createUser,
  getUserById,
  getAllUsers,
  updateUserById,
  deleteUserById,
};

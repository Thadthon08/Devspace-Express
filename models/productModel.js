let products = []; //database
const sequelize = require("./db");

const add = async (product) => {
  const { id, name, description, price, quantity } = product;

  //sql prepared statement
  const sql = `INSERT INTO products (id, name, description, price, quantity) 
  VALUES (?, ?, ?, ?, ?)`;
  const replacements = [id, name, description, price, quantity];

  //execute sql
  const [_, metadata] = await sequelize.query(sql, { replacements });
  if (metadata > 0) return product;
  return null;
};

const findById = async (id) => {
  //sql prepared statement
  const sql = `SELECT * FROM products WHERE id = ?`;
  const replacements = [id];

  //sql execute
  const result = await sequelize.query(sql, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
  });
  return result?.length > 0 ? result[0] : null;
};

const updateById = async (id, dataUpdate) => {
  //sql prepared statement
  const sql = `UPDATE products 
  SET name = ?, description = ?, price = ?, quantity = ? 
  WHERE id = ?`;

  //sql execute
  //find product
  const product = await findById(id);
  if (!product) return null;

  //update product
  const newData = { ...product, ...dataUpdate };
  const { name, description, price, quantity } = newData;
  const replacements = [name, description, price, quantity, id];
  const [_, metadata] = await sequelize.query(sql, { replacements });

  if (metadata?.affectedRows > 0) return newData;
  return null;
};

const deleteById = async (id) => {
  //sql prepared statement
  const sql = `DELETE FROM products WHERE id = ?`;
  const replacements = [id];

  //sql execute
  const [_, metadata] = await sequelize.query(sql, { replacements });
  if (metadata?.affectedRows > 0) return true;
  return false;
};

module.exports = {
  add,
  findById,
  updateById,
  deleteById,
};

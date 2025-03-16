const express = require("express");
const app = express();
require("dotenv").config();

//importing the database
const sequelize = require("../../models/db");

app.get("/app/sqlInjection/:username", async (req, res) => {
  const username = req.params.username; //devvspacce' OR '1'='1
  const sql = `SELECT * FROM users
    WHERE username = '${username}' `;

  //execute sql
  const result = await sequelize.query(sql, {
    type: sequelize.QueryTypes.SELECT,
  });
  res.json({ user: result });
});

app.listen(3000, () =>
  console.log("Server is running on http://localhost:3000")
);

const express = require("express");
const helloRoutes = express.Router();
const helloController = require("../controllers/helloController");

helloRoutes.get("/", helloController.getHello);

module.exports = helloRoutes;

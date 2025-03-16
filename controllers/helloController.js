const helloModel = require("../models/helloModel");

const getHello = (req, res) => {
  req.id = 1; //hard code, mock data
  const id = req.id;
  const msg = helloModel.getMsgById(id);
  //   const msg = getAllMsg();
  res.send(msg);
};

module.exports = {
  getHello,
};

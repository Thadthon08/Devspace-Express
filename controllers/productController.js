const productModel = require("../models/productModel");
const { successReponse, errorResponse } = require("../helpers/response");

const addProduct = async (req, res) => {
  const data = req.body;

  //validate
  const exitingProduct = await productModel.findById(data.id);
  if (exitingProduct)
    return errorResponse(res, "สินค้า ID นี้ มีอยู่แล้วในระบบ");

  //add
  const result = await productModel.add(data);
  successReponse(res, "เพิ่มสินค้าสำเร็จ !!", result, 201);
};

const getProduct = async (req, res) => {
  const id = Number(req.params.id); //id to number
  const result = await productModel.findById(id);
  if (!result) return errorResponse(res, "ไม่พบสินค้าดังกล่าว !!!", 404);
  successReponse(res, "ค้นหาสินค้าสำเร็จ !!", result);
};

const updateProduct = async (req, res) => {
  const id = Number(req.params.id);
  const dataUpdate = req.body;

  //validate
  const exitingProduct = await productModel.findById(id);
  if (!exitingProduct)
    return errorResponse(
      res,
      "ไม่พบสินค้าดังกล่าว ทำให้ไม่สามารถอัพเดทข้อมูลได้ !!!",
      404
    );

  //update
  const result = await productModel.updateById(id, dataUpdate);
  successReponse(res, "อัพเดทสต๊อกสินค้าสำเร็จ !!", result);
};

const deleteProduct = async (req, res) => {
  const id = Number(req.params.id);

  //validate
  const exitingProduct = await productModel.findById(id);
  if (!exitingProduct)
    return errorResponse(
      res,
      "ไม่พบสินค้าดังกล่าว ทำให้ไม่สามารถลบข้อมูลได้ !!!",
      404
    );

  //delete
  const isDelteSuccess = await productModel.deleteById(id);
  if (isDelteSuccess) {
    successReponse(res, "delete success", {});
    return;
  }
  successReponse(res, "Not Found", {}, 404);
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

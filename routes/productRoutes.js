const express = require("express");
const route = express.Router();
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  singleProduct
} = require('../controller/Product/product');
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// Get product
route.route("/product").get(getProduct).post(verifyTokenAndAdmin,addProduct)
route.route("/product/:id").get(singleProduct).put(verifyTokenAndAdmin,updateProduct).delete(verifyTokenAndAdmin,deleteProduct);


module.exports = route
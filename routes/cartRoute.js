const express = require("express");
const route = express.Router();
const {
  getCart,
  addCart,
  updateCart,
  deleteCart,
  singleCart
} = require('../controller/Cart/Cart');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

// Get Cart
route.route("/cart").get(verifyTokenAndAdmin,getCart).post(verifyToken,addCart)
route.route("/cart/:id").get(verifyTokenAndAuthorization,singleCart).put(verifyTokenAndAuthorization,updateCart).delete(verifyTokenAndAuthorization,deleteCart);


module.exports = route
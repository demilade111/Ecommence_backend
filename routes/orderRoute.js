const express = require("express");
const route = express.Router();
const {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  singleOrder
} = require('../controller/Order/Order');
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

// Get Order
route.route("/order").get(verifyTokenAndAdmin,getOrder).post(verifyToken,addOrder)
route.route("/Order/:id").get(verifyTokenAndAuthorization,singleOrder).put(verifyTokenAndAdmin,updateOrder).delete(verifyTokenAndAdmin,deleteOrder);
route.route("/income").get(verifyTokenAndAdmin,singleOrder)


module.exports = route
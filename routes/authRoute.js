const express = require("express");
const { Login, Register } = require("../controller/Auth/Auth");
const { updateUser, deleteUser, singleUser, getUser, getStat } = require("../controller/user/user");


const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("../middlewares/verifyToken");
const route = express.Router();

// Get product
route.route("user//login").post( Login);
route.route("user/register").post(Register);
route.route("/user/update/:id").put(verifyTokenAndAuthorization, updateUser);
route.route("/user/delete/:id").delete(verifyTokenAndAuthorization, deleteUser);
route.route("/user/find/:id").get(verifyTokenAndAdmin, singleUser);
route.route("/user").get(getUser);
route.route("/user/stat").get(verifyTokenAndAdmin, getStat);

module.exports = route;

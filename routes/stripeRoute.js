const express = require('express');
const route = express.Router();
const stripe = require("../controller/Stripe");

route.route("/payment", stripe);

module.exports = route;

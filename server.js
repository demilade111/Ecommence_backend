const express = require("express");
const env = require("dotenv").config();
const connectDb = require("../backend/config/Db");
var bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes.js");
const authRoute = require("./routes/authRoute.js");
const cartRoute = require("./routes/cartRoute.js");
const stripeRoute = require("./routes/stripeRoute");
const port = process.env.PORT || 5000;
const app = express();
const { error, errorHandler } = require("../backend/middlewares/Error");
const cors = require("cors");

// stripe payment

connectDb();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);

// parse application/json
app.use(bodyParser.json());

app.use(cors);

// Routes

app.use("/api", productRoutes);
app.use("/api", authRoute);
app.use("/api", cartRoute);
app.use("/api", stripeRoute);

// Error Handler
app.use(error);
app.use(errorHandler);

app.listen(port, () => console.log("listening on port 5000"));

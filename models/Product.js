const mongoose = require("mongoose");


const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: "string",
      required: true,
      unique: true,
    },
    desc: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);


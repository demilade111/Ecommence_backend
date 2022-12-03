const Cart = require("../../models/Cart");
const asyncHandler = require("express-async-handler");

//GET ALL USERS CART
const getCart = asyncHandler(async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Carts;

    if (qNew) {
      Carts = await Cart.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Carts = await Cart.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Carts = await Cart.find();
    }

    res.status(200).json(Carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE USERS CART
const addCart = asyncHandler(async (req, res, next) => {
  const newCart = await new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE USERS CART
const updateCart = asyncHandler(async (req, res, next) => {
  try {
    const newCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET SINGLES CART
const singleCart = asyncHandler(async (req, res, next) => {
  try {
    const Carts = await Cart.findById(req.params.id);
    res.status(201).json(Carts);
  } catch (err) {
    throw new Error("Cart not found");
  }
});

// DELETE USERS CART
const deleteCart = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.status(201).json({ message: "Cart removed successfully" });
  } catch (err) {
    throw new Error("Cart not deleted");
  }
});

module.exports = {
  getCart,
  addCart,
  updateCart,
  deleteCart,
  singleCart,
};

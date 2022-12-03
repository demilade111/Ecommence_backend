const Product = require("../../models/Product");
const asyncHandler = require("express-async-handler");



//GET ALL Product
const getProduct = asyncHandler(async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE PRODUCT
const addProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create({
    title: req.body.title,
    desc: req.body.desc,
    image: req.file.path,
    categories: req.body.categories,
    size: req.body.size,
    color: req.body.color,
    price: req.body.pric

  });
  if (product) {
      res.status(200).json(product);
  } else {
    throw new Error('Error creating product')
  }

});


// UPDATE PRODUCT
const updateProduct = asyncHandler(async (req, res, next) => {
  try {
    const newProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET SINGLE PRODUCT
const singleProduct = asyncHandler(async (req, res, next) => {
  try {
    const Products = await Product.findById(req.params.id);
    res.status(201).json(Products);
  } catch (err) {
    throw new Error("Product not found");
  }
});

// DELETE PRODUCT
const deleteProduct = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(201).json({ message: "Product removed successfully" });
  } catch (err) {
    throw new Error("Product not deleted");
  }
});

module.exports = {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  singleProduct
};

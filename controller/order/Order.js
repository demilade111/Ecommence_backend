const Order = require("../../models/Order");
const asyncHandler = require("express-async-handler");


//GET ALL USERS Order
const getOrder = asyncHandler(async (req, res, next) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Orders;

    if (qNew) {
      Orders = await Order.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Orders = await Order.find({
        categories: {
          $in: [qCategory]
        }
      });
    } else {
      Orders = await Order.find();
    }

    res.status(200).json(Orders);
  } catch (err) {
    res.status(500).json(err);
  }
});


// CREATE USERS Order
const addOrder = asyncHandler(async (req, res, next) => {
  const newOrder = await new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


// UPDATE USERS Order
const updateOrder = asyncHandler(async (req, res, next) => {
  try {
    const newOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(newOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET SINGLES Order
const singleOrder = asyncHandler(async (req, res, next) => {
  try {
    const Orders = await Order.find(req.params.id);
    res.status(201).json(Orders);
  } catch (err) {
    throw new Error("Order not found");
  }
});

// DELETE USERS Order
const deleteOrder = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(201).json({ message: "Order removed successfully" });
  } catch (err) {
    throw new Error("Order not deleted");
  }
});

const getTotalIncome = asyncHandler(async (req, res, next) => {
   const date = new Date();
   const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
   const previousMonth = new Date(
     new Date().setMonth(lastMonth.getMonth() - 1)
   );
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = {
  getOrder,
  addOrder,
  updateOrder,
  deleteOrder,
  singleOrder,
  getTotalIncome
};

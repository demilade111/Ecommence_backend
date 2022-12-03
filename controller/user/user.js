const User = require("../../models/user");
const asyncHandler = require("express-async-handler");

//GET ALL USER
const getUser = asyncHandler(async (req, res, next) => {
  try{
    // const query = req.query.new
     const query = req.query.new
 const users = query?await User.find().sort({id:-1}).limit(5):await User.find();
  res.status(200).json(users);
  }catch(e){
throw new Error("No User Found")
  }
 
});

// CREATE user
const addUser = asyncHandler(async (req, res, next) => {
  res.send("okay");
});

// UPDATE user
const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (user) {
    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(newUser);
  }
});
// GET SINGLE user
const singleUser = asyncHandler(async (req, res, next) => {
 try {
    const { id } = req.params
 const user= await User.findById(id);
    res.status(201).json(user);
  } catch (err) {
    throw new Error("User not found");
  }
});
// DELETE user
const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
 await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User removed successfully" });
  } catch (err) {
    throw new Error("User not deleted");
  }
});
// Get Stat
const getStat = asyncHandler(async (req, res, next) => {
const date = new Date()
const lastYear = date.setFullYear(date.getFullYear() - 1);


  try {
  const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    throw new Error("User not deleted");
  }
});



module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
  singleUser,
  getStat
};

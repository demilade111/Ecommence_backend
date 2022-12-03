const User = require("../../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//LOGIN USERS
const Login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    
    if (!email || !password) {
      res.status(400).send("All input are required");
    }
    const user = await User.findOne({ email });

    // create Token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.TOKEN_KEY,
      { expiresIn: "3d" }
    );
// Compare the user's Email and Password and Login
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(201).json({
        email: user.email,
        password: user.password,
        message: "Authenticated",
        token: token
      });
    } else {
      res.status(401);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.json(error);
  }
});

// REGISTER USER
const Register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(401).json({
      message: "Enter all Fields"
    });
  }

  // check if user exist
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("user already exist");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //   register users to the database
  const user = await User.create({
    username: username,
    email: email,
    password: hashPassword
  });

  // create Token
  const token = jwt.sign(
    { user: user._id, isAdmin: user.isAdmin },
    process.env.TOKEN_KEY,
    { expiresIn: "3d" }
  );
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      password: hashPassword,
      token: token
    });
  } else {
    res.status(401).json({ messgae: "Failed to register user" });
  }
});

module.exports = {
  Login,
  Register
};

//Register the user

const asyncHandler = require("express-async-handler");
const User = require("../models/userModal");
const bcrypt = require("bcrypt");

//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are  mandatory");
  }
  const userAvailable = await User.findOne({ email });
  console.log(userAvailable);

  if (userAvailable) {
    res.status(400).json({ message: "User already registered!" });

    // throw new Error("User already registered!");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "login the user" });
});
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});
module.exports = { registerUser, loginUser, currentUser };

const { generateOtp } = require("../common/generalHelpers");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { ADMIN_ROLE } = require("../common/Constants");

const registerUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (user) {
    res.json({ message: "User already registered", status: "Error" });
  }

  let salt = await bcrypt.genSalt(12);
  let hashedPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = await userModel.create({
    ...req.body,
    temporaryKey: generateOtp(),
    password: hashedPassword,
  });

  res.json({ message: newUser, status: "Success" });
});

const loginUser = asyncHandler(async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.json({ message: "User doesnot exist", status: "Error" });
  }

  let validPassword = false;
  if (user.role === ADMIN_ROLE) {
    validPassword = req.body.password === user.password;
  } else {
    validPassword = await bcrypt.compare(req.body.password, user.password);
  }

  if (!validPassword) {
    res.json({ message: "password does not match", status: "Error" });
  }
  const token = await jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  const validUser = {
    email: user.email,
    phoneNmber: user.phoneNumber,
    token: token,
  };

  res.json(validUser);
});

const findAUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json({ message: "No Email", status: "Error" });
  }
  const user = await userModel.findOne({ email });
  res.json({ message: user, status: "Success" });
});

module.exports = { registerUser, loginUser, findAUser };

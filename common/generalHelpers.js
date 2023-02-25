const userModel = require("../models/userModel");

const generateOtp = () => {
  return Math.floor(Math.random() * 9999 + 1000);
};

const createSeedAdmin = async () => {
  const admin = await userModel.findOne({ role: "Admin" });

  if (!admin) {
    userModel.create({
      name: "Samrat",
      email: "admin@gmail.com",
      role: "Admin",
      password: "abc123",
      phoneNumber: 4852357472,
      temporaryKey: "1234",
    });

    console.log("Admin Created");
  }
};

module.exports = { generateOtp, createSeedAdmin };

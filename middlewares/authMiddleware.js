const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

async function authMiddleware(req, res, next) {
  const token = await req.headers["auth-token"];

  if (!token) {
    res.json({ messge: "No Token" });
  }

  const { _id } = jwt.verify(token, process.env.TOKEN_SECRET);

  const user = await userModel.findById({ _id });

  req.user = user;
  if (user) {
    next();
  }
}

module.exports = { authMiddleware };

const { Schema, model } = require("mongoose");
const { USER_ROLE } = require("../common/Constants");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    trim: true,
  },
  phoneNumber: {
    type: Number,
    required: [true, "phoneNumber is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  temporaryKey: {
    type: String,
  },
  role: {
    type: String,
    default: USER_ROLE,
  },
});

module.exports = model("User", userSchema);

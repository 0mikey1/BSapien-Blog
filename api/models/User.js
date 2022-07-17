const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    // Every user has a username, email, password, and profile picture
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true } // creates updated at and created at timestamps
);

module.exports = mongoose.model("User", UserSchema);

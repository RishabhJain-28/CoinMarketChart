const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    watchlist: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "token",
      },
    ],
  },
  { timestamps: true }
);
//! add security paramaters like max length and min length
userSchema.methods.verifyPassword = async function (password) {
  const isCorrect = await bcrypt.compare(password, this.password);
  return isCorrect;
};

const User = mongoose.model("user", userSchema);

module.exports = User;

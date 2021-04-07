const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Pleasae enter your email!"],
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone number!"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password!"],
    },
    role: {
      type: Number,
      default: 0, // 0 = user, 1 = admin
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/fukunagaengineers/image/upload/v1617762333/avatars/default_avatar_p0x5ql.png",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("Users", userSchema);

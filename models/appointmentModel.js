const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Booked", "Available"],
      default: "Available",
    },
    startDateTime: {
      type: Date,
      required: true,
    },
    endDateTime: {
      type: Date,
      required: true,
    },
    user: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("appointment", appointmentSchema);

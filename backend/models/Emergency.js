const mongoose = require("mongoose");

const emergencySchema = new mongoose.Schema(
  {
    // Person who created the emergency
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Medical", "Fire", "Accident", "Crime", "Other"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Emergency", emergencySchema);
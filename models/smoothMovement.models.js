const mongoose = require("mongoose");

const smoothMovementSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 300 },
  },
  { timestamps: true }
);

const SmoothMovement = mongoose.model("SmoothMovement", smoothMovementSchema);
module.exports = SmoothMovement;

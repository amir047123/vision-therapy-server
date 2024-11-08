const mongoose = require("mongoose");

const colorTrapSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 60 },
  },
  { timestamps: true }
);

const ColorTrap = mongoose.model("ColorTrap", colorTrapSchema);
module.exports = ColorTrap;

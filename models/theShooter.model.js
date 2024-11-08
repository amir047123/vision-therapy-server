const mongoose = require("mongoose");

const theShooterSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 1500 },
  },
  { timestamps: true }
);

const TheShooter = mongoose.model("TheShooter", theShooterSchema);
module.exports = TheShooter;

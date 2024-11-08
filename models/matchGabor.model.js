const mongoose = require("mongoose");

const matchGaborSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 800 },
  },
  { timestamps: true }
);

const MatchGabor = mongoose.model("MatchGabor", matchGaborSchema);
module.exports = MatchGabor;

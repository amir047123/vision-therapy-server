const mongoose = require("mongoose");

const pingPongSchema = mongoose.Schema(
  {
    gameName: { type: String },
    userId: { type: String },
    userName: { type: String },
    score: { type: Number },
    remainingTime: { type: Number },
    date: { type: String },
    time: { type: String },
    possibleScore: { type: Number, default: 50 },
  },
  { timestamps: true }
);

const PingPong = mongoose.model("PingPong", pingPongSchema);
module.exports = PingPong;
